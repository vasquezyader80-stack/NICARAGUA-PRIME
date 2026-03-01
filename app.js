// Función para cargar productos desde tu API
async function cargarProductos() {
    try {
        const res = await fetch('/api/productos');
        const productos = await res.json();
        
        const contenedor = document.getElementById('lista-productos');
        contenedor.innerHTML = ''; // Limpiamos

        productos.forEach(p => {
            contenedor.innerHTML += `
                <div class="card-producto">
                    <img src="${p.imagen || 'placeholder.png'}" alt="${p.nombre}">
                    <div class="info">
                        <h3>${p.nombre}</h3>
                        <p class="precio">C$ ${p.precio}</p>
                        <button onclick="realizarPedido(${p.id}, ${p.precio})" class="btn-pedir">
                            Pedir ahora
                        </button>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        console.error("Error cargando productos pinoleros", e);
    }
}

// Función para comprar y usar Cacaos
function realizarPedido(id, precio) {
    let misCacaos = parseInt(localStorage.getItem('user_cacaos')) || 500;
    
    if (misCacaos >= 10) { // Ejemplo: cada pedido da 10 cacaos de descuento
        misCacaos -= 10;
        localStorage.setItem('user_cacaos', misCacaos);
        alert(`¡Pedido realizado! Has usado 10 Cacaos. Te quedan: ${misCacaos}`);
        location.reload(); // Para actualizar el contador en la UI
    } else {
        alert("¡No tienes suficientes Cacaos! Sigue comprando para acumular.");
    }
}
