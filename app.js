const App = {
    // NUESTRA RED DE PRODUCTOS NICARAGÜENSES
    products: [
        { id: 1, n: "Toña 12oz Pack", p: 240, m: "Compañía Cervecera", c: "bebidas", i: "🍺" },
        { id: 2, n: "Cerdo con Yuca", p: 150, m: "Fritanga Doña Tania", c: "fritanga", i: "🥘" },
        { id: 3, n: "Tajadas con Queso", p: 80, m: "Nica Snacks", c: "fritanga", i: "🥗" },
        { id: 4, n: "Leche Eskimo 1L", p: 38, m: "Lala/Eskimo", c: "super", i: "🥛" },
        { id: 5, n: "Flor de Caña 7 Años", p: 460, m: "SER Licorera", c: "bebidas", i: "🥃" },
        { id: 6, n: "Envío Express Chinandega", p: 60, m: "Pinol Express", c: "servicios", i: "🛵" }
    ],

    init() { 
        // Simular carga de servidores
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2200);

        this.renderGrid(this.products);
    },  

    // 1. NAVEGACIÓN ENTRE SECCIONES (AQUÍ ES DONDE LOS BOTONES FUNCIONAN)
    navigate(viewId, btn) {
        // Quitar 'active' de todas las vistas
        document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
        // Mostrar la vista que tocaste
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        // Actualizar visual de los botones del Dock
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        if(btn) btn.classList.add('active');
    },

    // 2. FILTRADO POR CATEGORÍA (FRITANGA, BEBIDAS, ETC)
    catFilter(category, btn) {
        // Estilo del botón pill
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');

        // Lógica de filtrado
        if(category === 'all') {
            this.renderGrid(this.products);
        } else {
            const filtered = this.products.filter(p => p.c === category);
            this.renderGrid(filtered);
        }
    },

    renderGrid(items) {
        const grid = document.getElementById('main-grid');
        grid.innerHTML = items.map(p => `
            <div class="p-card" onclick="App.buy('${p.n}')">
                <div class="p-img">${p.i}</div>
                <div class="p-info">
                    <b>${p.n}</b>
                    <small>${p.m}</small>
                    <span class="price-tag">C$ ${p.p}</span>
                </div>
            </div>
        `).join('');
    },

    // 3. INTERACCIÓN DE MODALES (SOCIOS Y DELIVERY)
    modal(type) {
        if(type === 'socio') {
            const biz = prompt("¿Cómo se llama tu negocio?");
            if(biz) alert(`¡Bienvenido ${biz}! Tu solicitud para vender en PinolApp ha sido enviada.`);
        } else {
            alert("Accediendo al formulario de reclutamiento para motorizados...");
        }
    },

    buy(name) {
        alert(`¡Excelente elección! Añadiste ${name} al carrito.`);
    }
};

window.onload = () => App.init();
