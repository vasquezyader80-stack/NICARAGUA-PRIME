var TierraNica = {
    // 1. BASE DE DATOS (Se llena con tus 100 productos)
    db: JSON.parse(localStorage.getItem('TierraNica_Store')) || {
        carrito: [],
        productos: [
            { id: 1, n: "Ron Artesanal Añejo", p: 1640, cat: "Chinandega", stock: 15 },
            { id: 2, n: "Sal Marina con Hierbas", p: 310, cat: "Chinandega", stock: 50 },
            { id: 3, n: "Mesa de Centro Tropical", p: 16400, cat: "Chinandega", stock: 5 },
            { id: 4, n: "Hamaca Matagalpa", p: 2500, cat: "Matagalpa", stock: 10 }
            // Aquí se irán sumando los 100 productos
        ]
    },

    init: function() {
        this.renderTienda();
        this.actualizarContador();
        
        // Remover Splash
        setTimeout(function() {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(function() {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2000);
    },

    // 2. FILTRAR POR CATEGORÍA/DEPARTAMENTO
    filtrar: function(dep) {
        var items = this.db.productos;
        if(dep !== 'todos') {
            items = items.filter(function(p) { return p.cat === dep; });
        }
        this.renderTienda(items);
    },

    // 3. LÓGICA DEL CARRITO
    agregar: function(id) {
        var prod = this.db.productos.find(function(p) { return p.id === id; });
        this.db.carrito.push(prod);
        localStorage.setItem('TierraNica_Store', JSON.stringify(this.db));
        this.actualizarContador();
        alert("✅ Añadido: " + prod.n);
    },

    actualizarContador: function() {
        var count = document.getElementById('cart-count');
        if(count) count.innerText = this.db.carrito.length;
    },

    // 4. DIBUJAR TIENDA
    renderTienda: function(productosAMostrar) {
        var lista = productosAMostrar || this.db.productos;
        var contenedor = document.getElementById('market-grid');
        var html = "";

        lista.forEach(function(p) {
            html += '<div class="p-card">' +
                    '<small>' + p.cat + '</small>' +
                    '<h4>' + p.n + '</h4>' +
                    '<b>C$ ' + p.p + '</b>' +
                    '<button onclick="TierraNica.agregar(' + p.id + ')">Añadir</button>' +
                    '</div>';
        });
        contenedor.innerHTML = html;
    }
};

window.onload = function() { TierraNica.init(); };
