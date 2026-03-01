const App = { 
    state: {
        get: () => {
            const saved = localStorage.getItem('PinolApp_v3');
            return saved ? JSON.parse(saved) : {
                user: "Yader Vasquez",
                cacaos: 500,
                myProducts: []
            };
        },
        save: (data) => localStorage.setItem('PinolApp_v3', JSON.stringify(data))
    },

    // Datos basados en tu captura 3
    localData: [
        { n: "Nacatamal Especial", p: 120, s: "Delicias Nicas", i: "🫔", c: "fritanga" },
        { n: "Toña 12oz (Pack 6)", p: 260, s: "Super Express", i: "🍺", c: "bebida" },
        { n: "Queso de Exportación (Lb)", p: 95, s: "Lácteos Chontales", i: "🧀", c: "super" },
        { n: "Vigorón Mixto", p: 140, s: "El Kiosko", i: "🥗", c: "fritanga" }
    ],

    init() {
        // Simular Splash (Foto 2)
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2500);

        this.render();
    },

    render() {
        const data = this.state.get();
        const grid = document.getElementById('product-grid');
        const allProducts = [...data.myProducts, ...this.localData];

        grid.innerHTML = allProducts.map(p => `
            <div class="card">
                <span class="badge-free">Envío Gratis</span>
                <div style="font-size: 30px; margin: 10px 0;">${p.i}</div>
                <b style="display:block; font-size:14px;">${p.n}</b>
                <small style="color:gray;">${p.s}</small>
                <div class="price-row">
                    <b>C$ ${p.p}</b>
                    <button class="add-btn">+</button>
                </div>
            </div>
        `).join('');
        
        document.getElementById('cacaos-val').innerText = data.cacaos;
    },

    navigate(view) {
        document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
        document.getElementById(`view-${view}`).style.display = 'block';
    }
};

window.onload = () => App.init();
