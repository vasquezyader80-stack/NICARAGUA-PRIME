// PinolApp v4.0 - Versión Blindada
var App = {
    // Base de datos local
    db: JSON.parse(localStorage.getItem('Pinol_Store_Pro')) || { productos: [], carrito: [] },

    init: function() {
        console.log("Iniciando...");
        this.render();
        
        // Quitar Splash
        setTimeout(function() {
            var splash = document.getElementById('splash');
            var app = document.getElementById('app');
            if(splash) splash.style.display = 'none';
            if(app) app.style.display = 'block';
        }, 2000);
    },

    nav: function(pantalla) {
        var vistas = document.querySelectorAll('.view');
        for(var i=0; i<vistas.length; i++) {
            vistas[i].classList.remove('active');
        }
        document.getElementById('view-' + pantalla).classList.add('active');
    },

    registrar: function() {
        var nombre = document.getElementById('p-name').value;
        var precio = document.getElementById('p-price').value;

        if(nombre === "" || precio === "") {
            alert("Por favor, llena los datos");
            return;
        }

        var nuevo = {
            id: Date.now(),
            nombre: nombre,
            precio: precio
        };

        this.db.productos.push(nuevo);
        localStorage.setItem('Pinol_Store_Pro', JSON.stringify(this.db));
        
        alert("¡Producto Guardado!");
        this.render();
        
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
    },

    render: function() {
        var contenedor = document.getElementById('market-grid');
        var html = "";

        if(this.db.productos.length === 0) {
            html = "<p style='text-align:center; width:100%;'>No hay productos aún.</p>";
        } else {
            for(var i=0; i<this.db.productos.length; i++) {
                var p = this.db.productos[i];
                html += '<div class="card-p">' +
                        '<b>' + p.nombre + '</b>' +
                        '<p>C$ ' + p.precio + '</p>' +
                        '<button onclick="alert(\'Pedido enviado\')">Pedir</button>' +
                        '</div>';
            }
        }
        contenedor.innerHTML = html;
    }
};

// Iniciar al cargar
window.onload = function() {
    App.init();
};
