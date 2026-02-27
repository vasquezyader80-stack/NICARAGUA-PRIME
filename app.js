const App = {
    // 1. DATABASE LOCAL
    db: {
        get: () => JSON.parse(localStorage.getItem('Pinol_DB')) || {
            user: "Yader",
            myProducts: [] // Productos creados por vos
        },
        save: (data) => localStorage.setItem('Pinol_DB', JSON.stringify(data))
    },

    // 2. PRODUCTOS FIJOS (RED NACIONAL)
    network: [
        { id: 1, n: "Cerveza Toña Pack", p: 245, m: "Cervecera Nacional", c: "bebidas", i: "🍺" },
        { id: 2, n: "Tip-Top Combo", p: 485, m: "Tip-Top Nicaragua", c: "comida", i: "🍗" },
        { id: 3, n: "Leche Eskimo 1L", p: 38, m: "Eskimo", c: "super", i: "🥛" },
        { id: 4, n: "Flor de Caña 7", p: 480, m: "SER Licorera", c: "bebidas", i: "🥃" }
    ],

    init() {
        const data = this.db.get();
        document.getElementById('prof-name').innerText = data.user;
        
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 1500);

        this.renderAll();
    },

    // 3. NAVEGACIÓN ENTRE BOTONES
    navigate(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        document.querySelectorAll('.d-item').forEach(d => d.classList.remove('active'));
        if(el) el.classList.add('active');

        if(viewId === 'socio') this.renderSocioList();
    },

    // 4. PANEL DE SOCIO (AGREGAR PRODUCTOS)
    addItem() {
        const name = document.getElementById('new-n').value;
        const price = document.getElementById('new-p').value;
        const cat = document.getElementById('new-c').value;

        if(!name || !price) return alert("Por favor completá los datos.");

        const data = this.db.get();
        data.myProducts.unshift({ id: Date.now(), n: name, p: parseInt(price), c: cat, m: "Socio Local", i: "🏪" });
        this.db.save(data);

        alert("¡Producto publicado en PinolApp!");
        document.getElementById('new-n').value = "";
        document.getElementById('new-p').value = "";
        this.renderAll();
        this.renderSocioList();
    },

    renderSocioList() {
        const data = this.db.get();
        const list = document.getElementById('admin-list');
        list.innerHTML = data.myProducts.map(p => `
            <div style="padding:15px; border-bottom:1px solid #eee; display:flex; justify-content:space-between">
                <span><b>${p.n}</b> (C$ ${p.p})</span>
                <button onclick="App.deleteItem(${p.id})" style="color:red; background:none; border:none; font-weight:800">Borrar</button>
            </div>
        `).join('');
    },

    deleteItem(id) {
        let data = this.db.get();
        data.myProducts = data.myProducts.filter(p => p.id !== id);
        this.db.save(data);
        this.renderSocioList();
        this.renderAll();
    },

    // 5. MARKETPLACE DINÁMICO
    renderAll() {
        const data = this.db.get();
        const grid = document.getElementById('grid');
        const total = [...data.myProducts, ...this.network];
        
        grid.innerHTML = total.map(p => `
            <div class="p-card">
                <div class="p-icon">${p.i}</div>
                <b>${p.n}</b><br>
                <small>${p.m}</small><br>
                <span class="p-price">C$ ${p.p}</span>
            </div>
        `).join('');
    }
};

window.onload = () => App.init();
