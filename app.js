const btnmensaje = document.getElementById('btnmensaje');
const mensajeclase = document.getElementById('mensajeclase');

let contadordeclics = 0;

btnmensaje.addEventListener('click',()=> {
  
    mensajeclase.textContent = 'el texto que quisimos mostrar en el parrafo'+ contadordeclics;
    contadordeclics = contadordeclics + 1;
});