const btnmensaje = document.getElementById('btnMensaje');
const mensajeclase = document.getElementById('mensajeClase');
const contadorClics = document.getElementById('contadorClics');

let contadordeclics = 0;

btnmensaje.addEventListener('click', () => {
    mensajeclase.textContent = 'El texto que quisimos mostrar en el párrafo.';
    contadordeclics += 1;
    contadorClics.textContent = `Número de clics: ${contadordeclics}`;
});


const botonesPerfil = document.querySelectorAll(".btnPerfil");
const detallePerfil = document.getElementById("detallePerfil");

botonesPerfil.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const perfil = boton.getAttribute("data-perfil");

    detallePerfil.innerHTML = `
      <h3>Información del perfil</h3>
      <p><strong>Perfil seleccionado:</strong> ${perfil}</p>
      <p>
        Este perfil es ficticio y se utiliza únicamente como parte de una práctica académica
        para aprender a construir interfaces de participación ciudadana.
      </p>
      <p>
        No corresponde a una candidatura real, no permite votar y no debe usar datos personales reales.
      </p>
    `;
  });
});