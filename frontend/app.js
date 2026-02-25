// Recuperar datos del teléfono al cargar
let datosUsuario = JSON.parse(localStorage.getItem('pinol_data')) || { 
    nombre: "Usuario Nica", 
    cacaos: 500, 
    inventario: [] 
};

function actualizarPantalla() {
    // Busca los ID en tu HTML para mostrar los datos
    if(document.getElementById('saldo')) {
        document.getElementById('saldo').innerText = datosUsuario.cacaos;
        localStorage.setItem('pinol_data', JSON.stringify(datosUsuario));
    }
}

// Función para registrar productos que persisten en la memoria
function registrarProducto(nombre) {
    datosUsuario.inventario.push(nombre);
    actualizarPantalla(); // Guarda automáticamente
    alert("¡Producto registrado en la memoria de tu celular! 🇳🇮");
}

window.onload = actualizarPantalla;
