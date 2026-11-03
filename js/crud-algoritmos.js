import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    onSnapshot, 
    doc, 
    updateDoc, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase (Sustituye con tus credenciales reales)
const firebaseConfig = {
  apiKey: "AIzaSyAbhxzDGgTh_hROC8hKulaZZnSJADa_8ac",
  authDomain: "bbraulioaguilar.firebaseapp.com",
  projectId: "bbraulioaguilar",
  storageBucket: "bbraulioaguilar.firebasestorage.app",
  messagingSenderId: "344040378046",
  appId: "1:344040378046:web:6d6b645fd01c8248f558ef",
  measurementId: "G-JZ3WTX0CL5"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const coleccionAlgoritmos = collection(db, "algoritmos");

// Elementos del DOM
const form = document.getElementById("form-algoritmo");
const tabla = document.getElementById("tabla-algoritmos");
const inputId = document.getElementById("algoritmo-id");
const inputNombre = document.getElementById("nombre");
const inputTipo = document.getElementById("tipo");
const inputDescripcion = document.getElementById("descripcion");
const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");

// Los 22 registros iniciales solicitados
const registrosIniciales = [
    { id: 1, nombre: "Búsqueda lineal", descripcion: "Revisa los elementos uno por uno hasta encontrar el dato buscado.", tipo: "Secuencial" },
    { id: 2, nombre: "Búsqueda binaria", descripcion: "Divide una lista ordenada en mitades para localizar un elemento.", tipo: "Divide y vencerás" },
    { id: 3, nombre: "Búsqueda en amplitud (BFS)", descripcion: "Explora primero los nodos de un nivel antes de avanzar al siguiente.", tipo: "Ciega" },
    { id: 4, nombre: "Búsqueda en profundidad (DFS)", descripcion: "Explora una rama hasta el final y después regresa para explorar otras.", tipo: "Ciega" },
    { id: 5, nombre: "Búsqueda de costo uniforme", descripcion: "Explora primero el camino con el menor costo acumulado.", tipo: "Ciega" },
    { id: 6, nombre: "Búsqueda bidireccional", descripcion: "Busca desde el inicio y desde la meta hasta que ambas búsquedas se encuentran.", tipo: "Ciega" },
    { id: 7, nombre: "Búsqueda local", descripcion: "Modifica una solución inicial para encontrar otra mejor entre sus vecinas.", tipo: "Local" },
    { id: 8, nombre: "Ascenso de colina (Hill Climbing)", descripcion: "Elige un vecino que mejore la solución actual hasta que no encuentra una mejora.", tipo: "Local" },
    { id: 9, nombre: "Recocido simulado", descripcion: "Acepta ocasionalmente soluciones peores para evitar quedar atrapado en óptimos locales.", tipo: "Local" },
    { id: 10, nombre: "Búsqueda tabú", descripcion: "Utiliza una lista de movimientos recientes para evitar repetir soluciones y escapar de óptimos locales.", tipo: "Local" },
    { id: 11, nombre: "Búsqueda voraz (Greedy)", descripcion: "Elige en cada paso la opción que parece más conveniente según una estimación.", tipo: "Heurística" },
    { id: 12, nombre: "Búsqueda A*", descripcion: "Combina el costo recorrido con una estimación del costo que falta para llegar a la meta.", tipo: "Heurística" },
    { id: 13, nombre: "Búsqueda voraz por mejor primero", descripcion: "Expande el nodo que parece estar más cerca de la meta según una función heurística.", tipo: "Heurística" },
    { id: 14, nombre: "Búsqueda por haz (Beam Search)", descripcion: "Conserva una cantidad limitada de los candidatos más prometedores en cada nivel.", tipo: "Heurística" },
    { id: 15, nombre: "Búsqueda por escalada estocástica", descripcion: "Selecciona aleatoriamente entre movimientos que pueden mejorar la solución.", tipo: "Local" },
    { id: 16, nombre: "Algoritmo genético", descripcion: "Genera poblaciones de soluciones y las mejora mediante selección, cruce y mutación.", tipo: "Genético o evolutivo" },
    { id: 17, nombre: "Programación genética", descripcion: "Evoluciona programas o expresiones mediante selección, cruce y mutación.", tipo: "Genético o evolutivo" },
    { id: 18, nombre: "Estrategias evolutivas", descripcion: "Mejoran soluciones mediante selección y mutaciones, principalmente en problemas de optimización.", tipo: "Genético o evolutivo" },
    { id: 19, nombre: "Búsqueda por interpolación", descripcion: "Estima la posición probable de un elemento en una lista ordenada según su valor.", tipo: "Búsqueda en estructuras de datos" },
    { id: 20, nombre: "Búsqueda por salto (Jump Search)", descripcion: "Avanza por bloques de una lista ordenada y después busca dentro del bloque correspondiente.", tipo: "Búsqueda en estructuras de datos" },
    { id: 21, nombre: "Búsqueda exponencial", descripcion: "Encuentra un rango probable duplicando progresivamente el intervalo y después aplica búsqueda binaria.", tipo: "Búsqueda en estructuras de datos" },
    { id: 22, nombre: "Búsqueda hash", descripcion: "Utiliza una función hash para localizar información mediante una clave.", tipo: "Búsqueda en estructuras de datos" }
];

// Función para poblar Firebase si la base de datos está vacía
async function inicializarDatos() {
    const snapshot = await getDocs(coleccionAlgoritmos);
    if (snapshot.empty) {
        for (const alg of registrosIniciales) {
            await addDoc(coleccionAlgoritmos, alg);
        }
        console.log("Se han insertado los 22 registros iniciales en Firebase.");
    }
}

// Lectura en tiempo real (READ)
onSnapshot(coleccionAlgoritmos, (snapshot) => {
    tabla.innerHTML = "";
    // Opcional: ordenar los documentos por su ID original si lo deseas
    let docsArray = snapshot.docs.map(docSnap => ({ idDoc: docSnap.id, ...docSnap.data() }));
    docsArray.sort((a, b) => (a.id || 0) - (b.id || 0));

    docsArray.forEach((data) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="padding: 8px;">${data.id || "N/A"}</td>
            <td style="padding: 8px;">${data.nombre}</td>
            <td style="padding: 8px;">${data.tipo}</td>
            <td style="padding: 8px;">${data.descripcion}</td>
            <td style="padding: 8px;">
                <button class="btn-editar" data-id="${data.idDoc}" data-nombre="${data.nombre}" data-tipo="${data.tipo}" data-desc="${data.descripcion}" data-originalid="${data.id || ''}">Editar</button>
                <button class="btn-eliminar" data-id="${data.idDoc}">Eliminar</button>
            </td>
        `;
        tabla.appendChild(tr);
    });

    // Activar eventos de Editar
    document.querySelectorAll(".btn-editar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            inputId.value = e.target.getAttribute("data-id");
            inputNombre.value = e.target.getAttribute("data-nombre");
            inputTipo.value = e.target.getAttribute("data-tipo");
            inputDescripcion.value = e.target.getAttribute("data-desc");
            btnGuardar.textContent = "Actualizar Algoritmo";
            btnCancelar.style.display = "inline-block";
        });
    });

    // Activar eventos de Eliminar (DELETE)
    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            const idDoc = e.target.getAttribute("data-id");
            if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
                await deleteDoc(doc(db, "algoritmos", idDoc));
            }
        });
    });
});

// Guardar o Actualizar (CREATE / UPDATE)
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const idDoc = inputId.value;
    const datosAlgoritmo = {
        nombre: inputNombre.value.trim(),
        tipo: inputTipo.value.trim(),
        descripcion: inputDescripcion.value.trim()
    };

    if (idDoc === "") {
        // Crear nuevo registro (generando un ID numérico secuencial simple o dejando que Firestore asigne)
        datosAlgoritmo.id = Date.now().toString().slice(-3); // ID temporal numérico aleatorio
        await addDoc(coleccionAlgoritmos, datosAlgoritmo);
    } else {
        // Actualizar registro existente
        await updateDoc(doc(db, "algoritmos", idDoc), datosAlgoritmo);
    }

    limpiarFormulario();
});

// Cancelar edición
btnCancelar.addEventListener("click", () => {
    limpiarFormulario();
});

function limpiarFormulario() {
    inputId.value = "";
    form.reset();
    btnGuardar.textContent = "Guardar Algoritmo";
    btnCancelar.style.display = "none";
}

// Inicializar al cargar
inicializarDatos();