const App = {
    // MEMORIA PERSISTENTE (LOCALSTORAGE)
    db: {
        get: () => JSON.parse(localStorage.getItem('Pinol_Store_v1')) || { user: "Yader", store: [] },
        save: (data) => localStorage.setItem('Pinol_Store_v1', JSON.stringify(data))
    },

    // PRODUCTOS POR DEFECTO (RED NACIONAL)
    network: [
        { id: 1, n: "Cerveza Toña Pack", p: 245, m: "Cervecera Nacional", c: "bebidas", i: "🍺" },
        { id: 2, n: "Tip-Top Familiar", p: 485, m: "Tip-Top Nicaragua", c: "comida", i: "🍗" },
        { id: 3, n: "Ron Flor de Caña 7", p: 480, m: "SER Licorera", c: "bebidas", i: "🥃" },
        { id: 4, n: "Gallo Pinto c/ Carne", p: 150, m: "Fritanga Local", c: "comida", i: "🥘" }
    ],

    init() {
        const data = this.db.get();
        document.getElementById('u-name').innerText = data.user;
        
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 1500);

        this.renderHome();
    }, 

    // NAVEGACIÓN ENTRE BOTONES
    navigate(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        document.querySelectorAll('.d-btn').forEach(d => d.classList.remove('active'));
        if(el) el.classList.add('active');

        if(viewId === 'socio') this.renderSocio();
    },

    // PANEL DE SOCIO (AGREGAR)
    addProd() {
        const n = document.getElementById('p-name').value;
        const p = document.getElementById('p-price').value;
        const c = document.getElementById('p-cat').value;

        if(!n || !p) return alert("¡Ey! Llená los campos.");

        const data = this.db.get();
        data.store.unshift({ id: Date.now(), n, p: parseInt(p), c, m: "Socio Local", i: "🏪" });
        this.db.save(data);

        alert("¡Producto publicado!");
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
        this.renderHome();
        this.renderSocio();
    },

    renderSocio() {
        const data = this.db.get();
        const list = document.getElementById('inventory-list');
        list.innerHTML = data.store.map(p => `
            <div style="padding:15px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; background:white;">
                <span><b>${p.n}</b> (C$ ${p.p})</span>
                <button onclick="App.deleteItem(${p.id})" style="color:red; border:none; background:none; font-weight:800">Borrar</button>
            </div>
        `).join('');
    },

    deleteItem(id) {
        let data = this.db.get();
        data.store = data.store.filter(p => p.id !== id);
        this.db.save(data);
        this.renderSocio();
        this.renderHome();
    },

    // MARKETPLACE PRINCIPAL
    renderHome() {
        const data = this.db.get();
        const grid = document.getElementById('grid');
        const all = [...data.store, ...this.network];
        
        grid.innerHTML = all.map(p => `
            <div class="p-card">
                <div class="p-img-box">${p.i}</div>
                <div class="p-txt-box">
                    <b>${p.n}</b>
                    <small>${p.m}</small>
                    <span class="p-price">C$ ${p.p}</span>
                </div>
            </div>
        `).join('');
    }
};

window.onload = () => App.init();
