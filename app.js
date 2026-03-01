// Función para enviar un producto nuevo al servidor
async function registrarProducto() {
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        vendedor: "Vendedor de Managua", // Esto vendrá del perfil
        cacaos: 10 // Puntos que genera
    };

    try {
        const response = await fetch('/api/productos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(producto)
        });

        if (response.ok) {
            // También lo guardamos localmente como pediste
            let locales = JSON.parse(localStorage.getItem('productos_registrados')) || [];
            locales.push(producto);
            localStorage.setItem('productos_registrados', JSON.stringify(locales));
            
            alert("¡Producto registrado en la nube y en tu celular!");
        }
    } catch (error) {
        console.error("Error al conectar con el server", error);
    }
}
