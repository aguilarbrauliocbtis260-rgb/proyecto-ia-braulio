
const diapositivas = document.querySelectorAll(".diapositiva");
const indicadores = document.querySelectorAll(".indicador");
const botonAnterior = document.querySelector(".anterior");
const botonSiguiente = document.querySelector(".siguiente");
const carrusel = document.querySelector(".carrusel");

let indiceActual = 0;
let temporizador;

function mostrarImagen(indice) {
    diapositivas[indiceActual].classList.remove("activa");
    indicadores[indiceActual].classList.remove("activo");

    indiceActual = (indice + diapositivas.length) % diapositivas.length;

    diapositivas[indiceActual].classList.add("activa");
    indicadores[indiceActual].classList.add("activo");
}

function siguienteImagen() {
    mostrarImagen(indiceActual + 1);
}

function anteriorImagen() {
    mostrarImagen(indiceActual - 1);
}

function iniciarCarrusel() {
    clearInterval(temporizador);

    temporizador = setInterval(() => {
        siguienteImagen();
    }, 4000);
}

botonSiguiente.addEventListener("click", () => {
    siguienteImagen();
    iniciarCarrusel();
});

botonAnterior.addEventListener("click", () => {
    anteriorImagen();
    iniciarCarrusel();
});

indicadores.forEach((indicador, indice) => {
    indicador.addEventListener("click", () => {
        mostrarImagen(indice);
        iniciarCarrusel();
    });
});

carrusel.addEventListener("mouseenter", () => {
    clearInterval(temporizador);
});

carrusel.addEventListener("mouseleave", () => {
    iniciarCarrusel();
});

iniciarCarrusel();
