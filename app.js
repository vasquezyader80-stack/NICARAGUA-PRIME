const App = {
    // Motor de Datos (Z-Engine)
    db: {
        get: () => JSON.parse(localStorage.getItem('Pinol_Master_DB')) || { cacaos: 750, myBiz: [] },
        set: (data) => localStorage.setItem('Pinol_Master_DB', JSON.stringify(data))
    },

    catalog: [
        { n: "Nacatamal Navideño", p: 130, s: "Delicias Nicas", i: "🫔", c: "comida" },
        { n: "Pack Toña (6)", p: 280, s: "Super Express", i: "🍺", c: "bebida" },
        { n: "Vigorón Granadino", p: 140, s: "El Kiosko", i: "🥗", c: "comida" }
    ],

    init() {
        this.renderFeed();
        this.updateUI();

        // Salida de Splash
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('main-app').classList.remove('app-hidden');
            }, 600);
        }, 3000);
    },

    updateUI() {
        const data = this.db.get();
        document.getElementById('cacaos-val').innerText = data.cacaos;
    },

    navigate(screenId, el) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`screen-${screenId}`).classList.add('active');
        
        if(el) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    },

    renderFeed() {
        const data = this.db.get();
        const feed = document.getElementById('feed');
        const all = [...data.myBiz, ...this.catalog];

        feed.innerHTML = all.map(p => `
            <div class="product-card">
                <div class="free-badge">Envío Gratis 🇳🇮</div>
                <div class="p-icon">${p.i}</div>
                <div class="p-info">
                    <b>${p.n}</b>
                    <small>${p.s}</small>
                    <div class="p-footer">
                        <span class="price">C$ ${p.p}</span>
                        <button class="add-btn">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    sellerPanel() {
        const name = prompt("Nombre de tu producto/negocio:");
        if(name) {
            const data = this.db.get();
            data.myBiz.push({ n: name, p: 100, s: "Mi Negocio", i: "🏬", c: "comida" });
            this.db.set(data);
            this.renderFeed();
            alert("¡Producto publicado en PinolApp!");
        }
    }
};

window.onload = () => App.init();
