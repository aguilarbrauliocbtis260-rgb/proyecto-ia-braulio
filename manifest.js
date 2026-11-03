// Nombre completo de la aplicación.
const manifest = {
    // Nombre que tendrá la aplicación.
    name: "Inteligencia Artificial",
    // Nombre corto de la aplicación.
    short_name: "IA",
    // Descripción de la aplicación.
    description: "Página educativa sobre Inteligencia Artificial, sus tipos, aplicaciones, ventajas y desafíos.",
    // Página que se abrirá al iniciar la aplicación.
    start_url: "index.html",
    // Hace que la página se muestre como una aplicación independiente.
    display: "standalone",
    // Color de fondo de la aplicación.
    background_color: "#ffffff",
    // Color principal de la aplicación.
    theme_color: "#000000",
    // Orientación vertical de la aplicación.
    orientation: "portrait",
    // Lista de iconos de la aplicación.
    icons: [
        {
            // Ubicación del icono de 192x192.
            src: "img/icono-192.png",
            // Tamaño del icono.
            sizes: "192x192",
            // Formato del icono.
            type: "image/png"
        },
        {
            // Ubicación del icono de 512x512.
            src: "img/icono-512.png",
            // Tamaño del icono.
            sizes: "512x512",
            // Formato del icono.
            type: "image/png"
        }
    ]
};