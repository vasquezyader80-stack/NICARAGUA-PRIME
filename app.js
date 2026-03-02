var App = {
    // Carga datos o crea una base limpia
    db: JSON.parse(localStorage.getItem('Pinol_Master_DB')) || { productos: [] },

    init: function() {
        console.log("PinolApp cargando...");
        this.render();
        
        // Quitar el Splash forzosamente a los 2 segundos
        setTimeout(function() {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(function() {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2000);
    },

    nav: function(viewId) {
        var views = document.querySelectorAll('.view');
        for(var i=0; i < views.length; i++) {
            views[i].classList.remove('active');
        }
        document.getElementById('view-' + viewId).classList.add('active');
    },

    vender: function() {
        var nombre = document.getElementById('p-name').value;
        var precio = document.getElementById('p-price').value;

        if(nombre === "" || precio === "") {
            alert("Por favor, llena los datos del producto.");
            return;
        }

        var nuevo = {
            id: Date.now(),
            nombre: nombre,
            precio: precio
        };

        this.db.productos.push(nuevo);
        localStorage.setItem('Pinol_Master_DB', JSON.stringify(this.db));
        
        alert("¡Éxito! Producto guardado en la memoria del teléfono.");
        this.render();
        
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
    },

    render: function() {
        var feed = document.getElementById('feed');
        var myList = document.getElementById('my-list');
        var html = "";

        if(this.db.productos.length === 0) {
            html = "<p style='grid-column: 1/-1; text-align:center;'>No hay productos aún. ¡Registra el tuyo!</p>";
        } else {
            for(var i=0; i < this.db.productos.length; i++) {
                var p = this.db.productos[i];
                html += '<div class="p-card">' +
                        '<b>' + p.nombre + '</b>' +
                        '<p style="color:blue">C$ ' + p.precio + '</p>' +
                        '<button onclick="alert(\'Pedido enviado\')" style="padding:5px; font-size:12px;">Comprar</button>' +
                        '</div>';
            }
        }
        feed.innerHTML = html;
        myList.innerHTML = html; // Muestra lo mismo en la lista de gestión
    }
};

// Arrancar App
window.onload = function() {
    App.init();
};
