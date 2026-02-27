const App = {
    // BASE DE DATOS MASIVA DE PRODUCTOS NICARAGÜENSES
    products: [
        { id: 1, n: "Toña 12oz Pack", p: 240, m: "Cervecera Nacional", c: "bebidas", i: "🍺" },
        { id: 2, n: "Queso Seco (Libra)", p: 98, m: "Lácteos Chontales", c: "super", i: "🧀" },
        { id: 3, n: "Gallo Pinto c/ Carne", p: 145, m: "Fritanga Don Gilberto", c: "restaurante", i: "🥘" },
        { id: 4, n: "Leche Eskimo 1L", p: 36, m: "Eskimo", c: "super", i: "🥛" },
        { id: 5, n: "Flor de Caña 7 Años", p: 460, m: "SER Licorera", c: "bebidas", i: "🥃" },
        { id: 6, n: "Pan de Molde Enano", p: 65, m: "Panadería Enano", c: "super", i: "🍞" },
        { id: 7, n: "Vigorón Granadino", p: 110, m: "El Kioskito", c: "restaurante", i: "🍽️" },
        { id: 8, n: "Jabón El Trébol", p: 25, m: "E. Chamorro", c: "super", i: "🧼" }
    ],

    init() {
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2000);    

        this.renderGrid(this.products);
    },

    renderGrid(items) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = items.map(p => `
            <div class="p-card" onclick="App.quickBuy('${p.n}', ${p.p})">
                <div class="img-box">${p.i}</div>
                <b>${p.n}</b>
                <small>${p.m}</small>
                <span class="p-price">C$ ${p.p}</span>
            </div>
        `).join('');
    },

    navigate(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        document.querySelectorAll('.dock-item').forEach(d => d.classList.remove('active'));
        if(el) el.classList.add('active');
    },

    search(val) {
        const filtered = this.products.filter(p => 
            p.n.toLowerCase().includes(val.toLowerCase()) || 
            p.m.toLowerCase().includes(val.toLowerCase())
        );
        this.renderGrid(filtered);
    },

    openSocio() {
        const biz = prompt("Nombre de tu Negocio/Marca:");
        if(biz) alert(`¡Gracias! Nuestro equipo comercial te contactará para afiliar a ${biz} a la red.`);
    },

    openDelivery() {
        alert("Cargando formulario de reclutamiento para motorizados en Nicaragua...");
    },

    quickBuy(name, price) {
        alert(`¡Añadido al carrito! ${name} por C$ ${price}. Registrate al finalizar para pagar.`);
    }
};

window.onload = () => App.init();
