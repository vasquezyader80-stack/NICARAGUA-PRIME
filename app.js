const App = {
    // PERSISTENCIA DE DATOS
    storage: {
        db: JSON.parse(localStorage.getItem('Pinol_DB_2026')) || {
            user: "Yader Vasquez",
            cacaos: 750,
            products: []
        },
        save() { localStorage.setItem('Pinol_DB_2026', JSON.stringify(this.db)); }
    },

    // CATÁLOGO BASE NICARAGÜENSE
    catalog: [
        { id: 101, n: "Vigorón Granadino", p: 130, s: "El Kiosko", c: "fritanga", i: "🥗" },
        { id: 102, n: "Toña Litro", p: 85, s: "Súper Express", c: "bebida", i: "🍺" },
        { id: 103, n: "Nacatamal de Cerdo", p: 110, s: "Doña Mary", c: "fritanga", i: "🫔" },
        { id: 104, n: "Queso Ahumado (Lb)", p: 90, s: "Lácteos Chontales", c: "super", i: "🧀" }
    ],

    init() {
        this.renderHome();
        this.updateStats();

        // SPLASH LOGIC
        setTimeout(() => {
            document.getElementById('splash').classList.add('fade-out');
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').classList.remove('hidden');
            }, 500);
        }, 3000);
    },

    updateStats() {
        document.getElementById('cacaos-count').innerText = this.storage.db.cacaos;
        document.getElementById('user-display-name').innerText = this.storage.db.user;
    },

    navigate(viewId, el) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        if(el) el.classList.add('active');
    },

    renderHome(filter = 'all') {
        const grid = document.getElementById('product-grid');
        // Unimos catálogo base con productos creados por el usuario (vendedor)
        let all = [...this.storage.db.products, ...this.catalog];

        if(filter !== 'all') all = all.filter(p => p.c === filter);

        grid.innerHTML = all.map(p => `
            <div class="card">
                <div class="badge">Envío Local</div>
                <div class="card-icon">${p.i || '📦'}</div>
                <div class="card-info">
                    <h3>${p.n}</h3>
                    <p>${p.s}</p>
                    <div class="price-row">
                        <b>C$ ${p.p}</b>
                        <button class="add-btn" onclick="App.buy(${p.p})">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    openBusinessPanel() {
        const name = prompt("Nombre de tu producto nica:");
        const price = prompt("Precio en Córdobas:");
        if(name && price) {
            this.storage.db.products.push({
                id: Date.now(),
                n: name,
                p: parseInt(price),
                s: "Negocio de " + this.storage.db.user,
                c: "super",
                i: "🏪"
            });
            this.storage.save();
            this.renderHome();
            alert("¡Producto registrado en tu memoria local!");
        }
    },

    buy(cost) {
        if(this.storage.db.cacaos >= 10) {
            this.storage.db.cacaos += 5; // Gana cacaos por comprar
            this.storage.save();
            this.updateStats();
            alert("¡Gracias por tu compra local!");
        }
    }
};

window.onload = () => App.init();
