const App = {
    // 1. SISTEMA ANTI-ERRORES (Auto-Limpieza)
    init() {
        console.log("PinolApp: Iniciando Motor 2026...");
        
        try {
            this.setupData();
            this.render();
            this.startAnimations();
        } catch (error) {
            console.error("Error crítico detectado. Reiniciando base de datos...");
            localStorage.clear(); // Borra la basura que causa la X roja
            location.reload();    // Recarga la app limpia
        }
    },

    setupData() {
        // Si no hay datos, creamos una estructura comercial real
        const saved = localStorage.getItem('Pinol_Global_DB');
        this.data = saved ? JSON.parse(saved) : {
            userName: "Yader Vasquez",
            moneda: "C$",
            productos: [
                { id: 1, nombre: "Nacatamal Especial", precio: 120, cat: "Fritanga" },
                { id: 2, nombre: "Quesillo en Bolsa", precio: 65, cat: "Tienda" }
            ],
            carrito: []
        };
    },

    // 2. LOGICA DE VENDEDOR (AFILIARSE)
    registrarVenta() {
        const nombre = document.getElementById('p-name').value;
        const precio = document.getElementById('p-price').value;
        const categoria = document.getElementById('p-cat').value;

        if(!nombre || !precio) return alert("❌ Datos incompletos");

        const nuevoProd = {
            id: Date.now(),
            nombre: nombre,
            precio: parseFloat(precio),
            cat: categoria
        };

        this.data.productos.push(nuevoProd);
        this.saveAndRefresh();
        alert("✅ ¡Producto registrado en Nicaragua!");
        
        // Limpiar formulario
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
    },

    // 3. LOGICA DE COMPRADOR
    agregarAlCarrito(id) {
        const prod = this.data.productos.find(p => p.id === id);
        this.data.carrito.push(prod);
        this.saveAndRefresh();
        alert("🛒 Añadido al pedido");
    },

    saveAndRefresh() {
        localStorage.setItem('Pinol_Global_DB', JSON.stringify(this.data));
        this.render();
    },

    render() {
        const feed = document.getElementById('market-grid');
        if(!feed) return;

        // Dibujar productos comerciales
        feed.innerHTML = this.data.productos.map(p => `
            <div class="product-card">
                <span class="badge">${p.cat}</span>
                <h4>${p.nombre}</h4>
                <div class="price-row">
                    <b>C$ ${p.precio}</b>
                    <button onclick="App.agregarAlCarrito(${p.id})">+</button>
                </div>
            </div>
        `).join('');

        // Actualizar contador del carrito
        const badge = document.getElementById('cart-count');
        if(badge) badge.innerText = this.data.carrito.length;
    },

    startAnimations() {
        // Forzar salida del Splash
        setTimeout(() => {
            const splash = document.getElementById('splash');
            if(splash) {
                splash.style.opacity = '0';
                setTimeout(() => {
                    splash.style.display = 'none';
                    document.getElementById('app').classList.remove('hidden');
                }, 600);
            }
        }, 2500);
    },

    nav(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        if(el) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    }
};

window.onload = () => App.init();
