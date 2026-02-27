const App = {
    // 1. MEMORIA DEL TELÉFONO (LOCALSTORAGE)
    storage: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_vFinal')) || {
            user: "Yader",
            store: [] // Productos del socio
        },
        save: (data) => localStorage.setItem('PinolApp_vFinal', JSON.stringify(data))
    },

    // 2. PRODUCTOS INTEGRADOS (RED NACIONAL)
    defaultProducts: [
        { id: 1, n: "Toña 12oz Pack", p: 245, m: "Compañía Cervecera", c: "bebidas", i: "🍺" },
        { id: 2, n: "Servicio de Caballo Bayo", p: 180, m: "Fritanga Selecta", c: "fritanga", i: "🥘" },
        { id: 3, n: "Ron Flor de Caña 7 Años", p: 480, m: "SER Licorera", c: "bebidas", i: "🥃" },
        { id: 4, n: "Leche Eskimo 1L", p: 38, m: "Eskimo Nicaragua", c: "super", i: "🥛" }
    ],

    init() {
        const data = this.storage.get();
        document.getElementById('name-tag').innerText = data.user;
        
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 1500);

        this.renderHome();
    },

    // 3. NAVEGACIÓN REAL
    navigate(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        document.querySelectorAll('.dock-btn').forEach(d => d.classList.remove('active'));
        if(el) el.classList.add('active');

        if(viewId === 'socio') this.renderInventory();
    },  

    // 4. GESTIÓN DEL SOCIO
    saveToDB() {
        const n = document.getElementById('p-name').value;
        const p = document.getElementById('p-price').value;
        const c = document.getElementById('p-cat').value;

        if(!n || !p) return alert("Por favor, completá los campos.");

        const data = this.storage.get();
        data.store.unshift({ id: Date.now(), n, p: parseInt(p), c, m: "Socio Local", i: "🏪" });
        this.storage.save(data);

        alert("¡Producto guardado exitosamente!");
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
        this.renderHome();
        this.renderInventory();
    },

    renderInventory() {
        const data = this.storage.get();
        const list = document.getElementById('my-products');
        list.innerHTML = data.store.map(p => `
            <div style="padding:15px; border-bottom:1px solid #eee; display:flex; justify-content:space-between">
                <b>${p.n} (C$ ${p.p})</b>
                <button onclick="App.deleteItem(${p.id})" style="color:red; background:none; border:none; font-weight:700">Eliminar</button>
            </div>
        `).join('');
    },

    deleteItem(id) {
        let data = this.storage.get();
        data.store = data.store.filter(p => p.id !== id);
        this.storage.save(data);
        this.renderInventory();
        this.renderHome();
    },

    // 5. MARKETPLACE
    renderHome() {
        const data = this.storage.get();
        const grid = document.getElementById('product-grid');
        const all = [...data.store, ...this.defaultProducts];
        
        grid.innerHTML = all.map(p => `
            <div class="p-card">
                <div class="p-img">${p.i}</div>
                <div class="p-info">
                    <b>${p.n}</b>
                    <small>${p.m}</small>
                    <span class="price-tag">C$ ${p.p}</span>
                </div>
            </div>
        `).join('');
    },

    search(val) {
        const data = this.storage.get();
        const all = [...data.store, ...this.defaultProducts];
        const filtered = all.filter(p => p.n.toLowerCase().includes(val.toLowerCase()));
        
        const grid = document.getElementById('product-grid');
        grid.innerHTML = filtered.map(p => `
            <div class="p-card">
                <div class="p-img">${p.i}</div>
                <div class="p-info"><b>${p.n}</b><br><span class="price-tag">C$ ${p.p}</span></div>
            </div>
        `).join('');
    }
};

window.onload = () => App.init();
