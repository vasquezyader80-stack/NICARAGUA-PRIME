const App = {
    // 1. CARGA DE BASE DE DATOS (LOCALSTORAGE)
    state: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_DB')) || {
            user: "Yader",
            myStore: [] // Aquí se guardan los productos que sube el socio
        },
        save: (data) => localStorage.setItem('PinolApp_DB', JSON.stringify(data))
    },

    // 2. PRODUCTOS DE LA RED (MARCAS REALES)
    networkProducts: [
        { id: 1, n: "Cerveza Toña 12oz Pack", p: 245, m: "Cervecera Nacional", c: "bebidas", i: "🍺" },
        { id: 2, n: "Tip-Top Combo Familiar", p: 485, m: "Tip-Top Nicaragua", c: "fritanga", i: "🍗" },
        { id: 3, n: "Leche Eskimo 1L", p: 38, m: "Eskimo / Lala", c: "super", i: "🥛" },
        { id: 4, n: "Ron Flor de Caña 7 Años", p: 480, m: "SER Licorera", c: "bebidas", i: "🥃" },
        { id: 5, n: "Cerdo con Yuca", p: 150, m: "Fritanga Local", c: "fritanga", i: "🥘" }
    ],

    init() {
        const data = this.state.get();
        document.getElementById('user-display').innerText = data.user;
        
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 2000);

        this.renderMarketplace();
    },

    // 3. NAVEGACIÓN ENTRE SECCIONES
    navigate(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        document.querySelectorAll('.d-item').forEach(d => d.classList.remove('active'));
        if(el) el.classList.add('active');

        if(viewId === 'socio') this.renderInventory();
    },  

    // 4. FUNCIONALIDAD DEL SOCIO (REGISTRO DE PRODUCTOS)
    postProduct() {
        const name = document.getElementById('new-name').value;
        const price = document.getElementById('new-price').value;
        const cat = document.getElementById('new-cat').value;

        if(!name || !price) return alert("¡Ey! Llená todos los campos para publicar.");

        const data = this.state.get();
        const product = {
            id: Date.now(),
            n: name,
            p: parseInt(price),
            c: cat,
            m: `Vendido por ${data.user}`,
            i: "🏪"
        };

        data.myStore.unshift(product);
        this.state.save(data);

        alert("¡Producto publicado exitosamente!");
        document.getElementById('new-name').value = "";
        document.getElementById('new-price').value = "";
        this.renderMarketplace();
        this.renderInventory();
    },

    renderInventory() {
        const data = this.state.get();
        const container = document.getElementById('socio-inventory');
        container.innerHTML = data.myStore.map(p => `
            <div class="inv-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee">
                <span><b>${p.n}</b> - C$ ${p.p}</span>
                <button onclick="App.deleteProd(${p.id})" style="color:red">Eliminar</button>
            </div>
        `).join('');
    },

    deleteProd(id) {
        let data = this.state.get();
        data.myStore = data.myStore.filter(p => p.id !== id);
        this.state.save(data);
        this.renderInventory();
        this.renderMarketplace();
    },

    // 5. MARKETPLACE DINÁMICO
    renderMarketplace() {
        const data = this.state.get();
        const grid = document.getElementById('product-grid');
        // Combinamos los productos de la red con los que subió el socio
        const allItems = [...data.myStore, ...this.networkProducts];
        
        grid.innerHTML = allItems.map(p => `
            <div class="p-card">
                <div class="p-img">${p.i}</div>
                <div class="p-info">
                    <b>${p.n}</b>
                    <small>${p.m}</small>
                    <span class="p-price">C$ ${p.p}</span>
                </div>
            </div>
        `).join('');
    }
};

window.onload = () => App.init();
