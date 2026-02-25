// Cargar Cacaos y productos del teléfono
let datos = JSON.parse(localStorage.getItem('pinol_data')) || { cacaos: 100, productos: [] };

function render() {
    document.getElementById('saldo').innerText = `C$ ${datos.cacaos}`;
    const app = document.getElementById('app');
    app.innerHTML = `<h3>Tus Productos:</h3>` + 
        (datos.productos.length ? datos.productos.map(p => `<p>📦 ${p}</p>`).join('') : '<p>No hay productos registrados.</p>') +
        `<br><button onclick="registrarProducto()" style="padding:10px; background:#ff6b00; color:white; border:none; border-radius:5px;">Registrar Producto</button>`;
}

function registrarProducto() {
    let p = prompt("Nombre del producto:");
    if(p) {
        datos.productos.push(p);
        localStorage.setItem('pinol_data', JSON.stringify(datos)); // Guarda en memoria
        render();
    }
}
render();
