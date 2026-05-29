const btnMensaje = document.getElementById('btnMensaje')
const mensajeClase = document.getElementById('mensajeClase')
const botonesPerfil = document.querySelectorAll('.btnPerfil')
const detallePerfil = document.getElementById('detallePerfil')


const btnGuardarCandidato = document.getElementById("btnGuardarCandidato");
const mensajeGuardado = document.getElementById("mensajeGuardado");
const contenedorCandidatosGuardados = document.getElementById("contenedorCandidatosGuardados");


async function cargarCandidatosGuardados() {
  try {
    const respuesta = await fetch("/api/candidatos");
    if (!respuesta.ok) throw new Error("Error al cargar candidatos");
    
    const candidatos = await respuesta.json();
    contenedorCandidatosGuardados.innerHTML = "";

    if (candidatos.length === 0) {
      const vacio = document.createElement("div");
      vacio.className = "estado-vacio";
      vacio.innerHTML = `
        <p>📋 No hay perfiles guardados aún</p>
        <p class="texto-pequeño">Completa el formulario anterior para crear tu primer perfil</p>
      `;
      contenedorCandidatosGuardados.appendChild(vacio);
      return;
    }

    candidatos.forEach(function (candidato, index) {
      const tarjeta = document.createElement("article");
      tarjeta.classList.add("tarjeta-guardada");
      tarjeta.innerHTML = `
        <div class="tarjeta-header">
          <span class="numero-perfil">#${index + 1}</span>
          <h3>${candidato.nombre}</h3>
        </div>
        <div class="tarjeta-contenido">
          <div class="campo">
            <span class="etiqueta">Rol</span>
            <p>${candidato.rol}</p>
          </div>
          <div class="campo">
            <span class="etiqueta">Propuesta</span>
            <p>${candidato.propuesta}</p>
          </div>
          <div class="campo campo--estado">
            <span class="etiqueta">Estado</span>
            <p class="estado-badge">${candidato.estado}</p>
          </div>
        </div>
      `;

      contenedorCandidatosGuardados.appendChild(tarjeta);
    });
  } catch (error) {
    console.error("Error:", error);
    mensajeGuardado.textContent = "Error al cargar candidatos.";
  }
}

btnGuardarCandidato.addEventListener("click", async function () {
  const nombre = document.getElementById("nombreCandidato").value.trim();
  const rol = document.getElementById("rolCandidato").value.trim();
  const propuesta = document.getElementById("propuestaCandidato").value.trim();

  if (!nombre || !rol || !propuesta) {
    mensajeGuardado.textContent = "Completa nombre, rol y propuesta.";
    return;
  }

  const nuevoPerfil = {
    nombre: nombre,
    rol: rol,
    propuesta: propuesta
  };

  try {
    const respuesta = await fetch("/api/candidatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoPerfil)
    });

    if (!respuesta.ok) {
      const resultado = await respuesta.json().catch(() => null);
      mensajeGuardado.textContent = resultado?.mensaje || "Error al guardar el perfil.";
      return;
    }

    const resultado = await respuesta.json();
    mensajeGuardado.textContent = resultado.mensaje;

    document.getElementById("nombreCandidato").value = "";
    document.getElementById("rolCandidato").value = "";
    document.getElementById("propuestaCandidato").value = "";

    cargarCandidatosGuardados();
  } catch (error) {
    console.error("Error al guardar perfil:", error);
    mensajeGuardado.textContent = "No se pudo conectar al servidor. Asegúrate de ejecutar el servidor.";
  }
});

function iniciarApp() {
  if (window.location.protocol === "file:") {
    mensajeGuardado.textContent = "Abre esta página desde el servidor local: http://localhost:30000/index.html";
    return;
  }

  cargarCandidatosGuardados();
}

iniciarApp();



let contadorDeClicks = 0

btnMensaje.addEventListener('click', () => {
    // mensajeClase.textContent = '¡Hola! Este es un mensaje de alerta.'
    mensajeClase.textContent = 'el texto que quisimos mostrar' + contadorDeClicks
    contadorDeClicks = contadorDeClicks + 1


})

botonesPerfil.forEach((boton) => {
    boton.addEventListener('click', () => {
        const perfil = boton.getAttribute('data-perfil')
        detallePerfil.textContent = `Información detallada del perfil: ${perfil}`
    })
})