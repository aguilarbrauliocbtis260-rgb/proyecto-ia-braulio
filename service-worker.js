// Define el nombre y la versión de la caché que utilizará la PWA.
const CACHE_NAME = "ia-pwa-v1";


// Crea una lista con los archivos principales que se guardarán en caché.
const ARCHIVOS = [

    // Archivo principal de la página web.
    "index.html",

    // Archivo que contiene los estilos de la página.
    "css/estilos.css",

    // Imagen principal relacionada con Inteligencia Artificial.
    "img/ia.png",

    // Icono de la PWA de 192 x 192 píxeles.
    "img/icono-192.png",

    // Icono de la PWA de 512 x 512 píxeles.
    "img/icono-512.png"

];


// Detecta cuando el Service Worker está siendo instalado.
self.addEventListener("install", event => {


    // Espera hasta que todos los archivos sean almacenados correctamente.
    event.waitUntil(


        // Abre o crea la caché con el nombre indicado anteriormente.
        caches.open(CACHE_NAME)


            // Cuando la caché está disponible, se ejecuta esta función.
            .then(cache => {


                // Agrega todos los archivos de la lista a la caché.
                return cache.addAll(ARCHIVOS);

            })

    );

});


// Detecta cuando el Service Worker se activa.
self.addEventListener("activate", event => {


    // Espera hasta que termine el proceso de limpieza de cachés anteriores.
    event.waitUntil(


        // Obtiene todas las cachés almacenadas en el navegador.
        caches.keys().then(keys => {


            // Ejecuta varias acciones de forma simultánea.
            return Promise.all(


                // Selecciona las cachés que no corresponden a la versión actual.
                keys

                    // Comprueba si el nombre de la caché es diferente al actual.
                    .filter(key => key !== CACHE_NAME)

                    // Elimina las cachés antiguas.
                    .map(key => caches.delete(key))

            );

        })

    );

});


// Detecta cada solicitud que realiza la página, como imágenes, CSS o HTML.
self.addEventListener("fetch", event => {


    // Permite controlar la respuesta de cada solicitud.
    event.respondWith(


        // Busca primero el archivo solicitado dentro de la caché.
        caches.match(event.request)


            // Cuando termina la búsqueda, ejecuta esta función.
            .then(response => {


                // Si encuentra el archivo en caché, lo utiliza.
                // Si no lo encuentra, lo solicita desde Internet.
                return response || fetch(event.request);

            })

    );

});