const App = {
    data: {
        get: () => {
            const db = localStorage.getItem('Pinol_Store_V4');
            return db ? JSON.parse(db) : { name: "Yader Vasquez", cacaos: 150, myItems: [] };
        },
        save: (obj) => localStorage.setItem('Pinol_Store_V4', JSON.stringify(obj))
    },

    catalog: [
        { n: "Nacatamal Especial", p: 120, s: "Delicias Nicas", i: "🫔", c: "comida" },
        { n: "Toña 12oz (Pack 6)", p: 260, s: "Super Express", i: "🍺", c: "bebida" },
        { n: "Queso Seco (Lb)", p: 95, s: "Lácteos Chontales", i: "🧀", c: "super" },
        { n: "Vigorón Mixto", p: 140, s: "El Kiosko", i: "🥗", c: "comida" }
    ],

    init() {
        const state = this.data.get();
        document.getElementById('prof-name').innerText = state.name;
        document.getElementById('prof-cacaos').innerText = `💰 ${state.cacaos} Cacaos acumulados`;

        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 2500);

        this.renderHome();
    },

    navigate(view) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.main-view').forEach(v => v.classList.remove('active'));
        // Mostrar la elegida
        document.getElementById(`view-${view}`).classList.add('active');

        // Actualizar Dock
        document.querySelectorAll('.dock-item').forEach(d => d.classList.remove('active'));
        if(view === 'home') document.getElementById('btn-home').classList.add('active');
        if(view === 'profile') document.getElementById('btn-profile').classList.add('active');
        
        if(view === 'home') this.renderHome();
    },

    renderHome(filter = 'all') {
        const state = this.data.get();
        const grid = document.getElementById('product-grid');
        let all = [...state.myItems, ...this.catalog];

        if(filter !== 'all') all = all.filter(p => p.c === filter);

        grid.innerHTML = all.map(p => `
            <div class="card-n">
                <span class="free-shipping">Envío Gratis</span>
                <div class="p-icon">${p.i}</div>
                <b>${p.n}</b><br>
                <small>${p.s}</small>
                <div class="price-tag">
                    <b>C$ ${p.p}</b>
                    <button class="add-btn">+</button>
                </div>
            </div>
        `).join('');
    },

    openSeller() {
        this.navigate('seller');
        this.renderSellerList();
    },

    registerProduct() {
        const n = document.getElementById('reg-name').value;
        const p = document.getElementById('reg-price').value;
        const c = document.getElementById('reg-cat').value;

        if(!n || !p) return alert("Completa los datos");

        const state = this.data.get();
        state.myItems.push({ n, p, c, s: "Mi Negocio", i: "🏪" });
        this.data.save(state);

        alert("¡Producto publicado!");
        this.renderSellerList();
    },

    renderSellerList() {
        const state = this.data.get();
        const list = document.getElementById('my-list');
        list.innerHTML = state.myItems.map(p => `<div>✅ ${p.n} - C$ ${p.p}</div>`).join('');
    },

    search(val) {
        const state = this.data.get();
        const all = [...state.myItems, ...this.catalog];
        const filtered = all.filter(p => p.n.toLowerCase().includes(val.toLowerCase()));
        
        const grid = document.getElementById('product-grid');
        grid.innerHTML = filtered.map(p => `
            <div class="card-n">
                <div class="p-icon">${p.i}</div>
                <b>${p.n}</b>
                <div class="price-tag"><b>C$ ${p.p}</b></div>
            </div>
        `).join('');
    }
};

window.onload = () => App.init();
