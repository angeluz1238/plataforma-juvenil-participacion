const btnmensaje = document.getElementById('btnmensaje');
const mensajeclase = document.getElementById('mensajeclase');
const contadorClics = document.getElementById('contadorclics');

let contadordeclics = 0;

btnmensaje.addEventListener('click', () => {
    mensajeclase.textContent = 'El texto que quisimos mostrar en el párrafo.';
    contadordeclics += 1;
    contadorClics.textContent = `Número de clics: ${contadordeclics}`;
});