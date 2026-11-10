
// Lista de alumnos de ejemplo
const alumnos = [
    { id: "1001", nombre: "Ana López", grupo: "5B", especialidad: "Programación" },
    { id: "1002", nombre: "Carlos Pérez", grupo: "5B", especialidad: "Programación" },
    { id: "1003", nombre: "María González", grupo: "5B", especialidad: "Programación" },
    { id: "1004", nombre: "Luis Hernández", grupo: "5B", especialidad: "Programación" },
    { id: "1005", nombre: "Sofía Martínez", grupo: "5B", especialidad: "Programación" },
    { id: "1006", nombre: "Diego Ramírez", grupo: "5B", especialidad: "Programación" }
];

// Mostrar todos los alumnos en la tabla
function mostrarAlumnos() {
    const tabla = document.getElementById("lista-alumnos");
    tabla.innerHTML = "";

    alumnos.forEach(alumno => {
        const fila = document.createElement("tr");

        [alumno.id, alumno.nombre, alumno.grupo, alumno.especialidad]
            .forEach(dato => {
                const celda = document.createElement("td");
                celda.textContent = dato;
                fila.appendChild(celda);
            });

        tabla.appendChild(fila);
    });
}

// Normalizar texto para comparar nombres
function normalizar(texto) {
    return texto
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Algoritmo de búsqueda secuencial
function buscarAlumno() {
    const criterio = document.getElementById("criterio-busqueda").value;
    const dato = document.getElementById("dato-busqueda").value.trim();

    const resultado = document.getElementById("resultado-alumno");
    const pasos = document.getElementById("pasos-algoritmo");
    const comparaciones = document.getElementById("comparaciones-alumno");
    const filas = document.querySelectorAll("#lista-alumnos tr");

    pasos.innerHTML = "";
    resultado.innerHTML = "";
    filas.forEach(fila => fila.classList.remove("alumno-encontrado"));

    if (dato === "") {
        resultado.textContent = "Escribe un ID o nombre para realizar la búsqueda.";
        comparaciones.textContent = "Comparaciones realizadas: 0";
        return;
    }

    let alumnoEncontrado = null;
    let posicion = -1;
    let totalComparaciones = 0;

    // Recorrer la lista uno por uno
    for (let i = 0; i < alumnos.length; i++) {
        totalComparaciones++;

        let coincide;

        if (criterio === "id") {
            coincide = alumnos[i].id === dato;
        } else {
            coincide = normalizar(alumnos[i].nombre)
                .includes(normalizar(dato));
        }

        const paso = document.createElement("li");

        paso.textContent =
            `Paso ${totalComparaciones}: Se revisa a ${alumnos[i].nombre} (ID: ${alumnos[i].id}). ` +
            (coincide ? "¡Coincidencia encontrada!" : "No coincide.");

        pasos.appendChild(paso);

        if (coincide) {
            alumnoEncontrado = alumnos[i];
            posicion = i;
            break;
        }
    }

    comparaciones.textContent =
        `Comparaciones realizadas: ${totalComparaciones}`;

    if (alumnoEncontrado) {
        resultado.textContent =
            `Alumno encontrado: ${alumnoEncontrado.nombre} | ` +
            `ID: ${alumnoEncontrado.id} | Grupo: ${alumnoEncontrado.grupo} | ` +
            `Especialidad: ${alumnoEncontrado.especialidad}. ` +
            `Posición en la lista: ${posicion + 1}.`;

        filas[posicion].classList.add("alumno-encontrado");
    } else {
        resultado.textContent =
            `No se encontró ningún alumno con ese ${criterio === "id" ? "ID" : "nombre"}.`;
    }
}

// Cargar la lista al abrir la página
document.addEventListener("DOMContentLoaded", mostrarAlumnos);
