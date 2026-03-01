const App = {
    // Almacenamiento Local (Data Persistence)
    db: {
        get: () => JSON.parse(localStorage.getItem('PinolMaster_V1')) || { 
            cacaos: 150, 
            user: "Yader Vasquez", 
            myProducts: [] 
        },
        save: (data) => localStorage.setItem('PinolMaster_V1', JSON.stringify(data))
    },

    catalog: [
        { n: "Nacatamal", p: 120, s: "Fritanga El Norte", i: "🫔" },
        { n: "Vigorón", p: 140, s: "Kiosko Central", i: "🥗" },
        { n: "Toña Litro", p: 85, s: "Súper Express", i: "🍺" }
    ],

    init() {
        this.updateUI();
        this.renderFeed();
        
        // Simular Splash de 2.5 seg
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').classList.add('hidden');
                document.getElementById('app').classList.remove('hidden');
            }, 500);
        }, 2500);
    },

    updateUI() {
        const data = this.db.get();
        document.getElementById('cacaos-display').innerText = data.cacaos;
    },

    nav(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        if(el) {
            document.querySelectorAll('.dock-tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    },

    renderFeed() {
        const data = this.db.get();
        const feed = document.getElementById('product-feed');
        const all = [...data.myProducts, ...this.catalog];

        feed.innerHTML = all.map(p => `
            <div class="p-card" style="background:white; margin:10px; padding:15px; border-radius:20px; box-shadow:0 4px 10px rgba(0,0,0,0.03);">
                <div style="font-size:35px; margin-bottom:10px;">${p.i || '🏪'}</div>
                <b style="display:block;">${p.n}</b>
                <small style="color:#888;">${p.s}</small>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                    <b style="color:var(--blue);">C$ ${p.p}</b>
                    <button style="background:var(--bg); border:none; border-radius:50%; width:30px; height:30px; font-weight:bold;">+</button>
                </div>
            </div>
        `).join('');
    },

    openSeller() {
        const name = prompt("Nombre de tu producto:");
        const price = prompt("Precio (C$):");
        if(name && price) {
            const data = this.db.get();
            data.myProducts.push({ n: name, p: price, s: "Mi Negocio", i: "🍱" });
            data.cacaos += 50; // Recompensa por registrar
            this.db.save(data);
            this.updateUI();
            this.renderFeed();
            alert("¡Felicidades! Ganaste 50 Cacaos por registrar un producto.");
        }
    },

    action(name) {
        alert(name + ": Próximamente disponible en PinolApp.");
    }
};

window.onload = () => App.init();
