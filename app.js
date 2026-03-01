const App = {
    // Memoria para recordar nombre y productos registrados
    db: {
        get: () => {
            const saved = localStorage.getItem('PinolApp_Yader');
            return saved ? JSON.parse(saved) : {
                user: "Yader Vasquez",
                cacaos: 500,
                customProducts: []
            };
        },
        save: (data) => localStorage.setItem('PinolApp_Yader', JSON.stringify(data))
    },

    // Datos por defecto (Como en tu foto)
    catalog: [
        { id: 1, n: "Nacatamal Especial", p: 120, s: "Delicias Nicas", i: "🫔", c: "comida" },
        { id: 2, n: "Toña 12oz (Pack 6)", p: 260, s: "Super Express", i: "🍺", c: "bebida" },
        { id: 3, n: "Queso de Exportación (Lb)", p: 95, s: "Lácteos Chontales", i: "🧀", c: "super" },
        { id: 4, n: "Vigorón Mixto", p: 140, s: "El Kiosko", i: "🥗", c: "comida" }
    ],

    init() {
        // Simular Splash de la foto
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 2200);

        this.render();
    },

    render(cat = 'all') {
        const data = this.db.get();
        const grid = document.getElementById('product-grid');
        
        // Mezclamos productos oficiales + los que vos registres como vendedor
        let all = [...data.customProducts, ...this.catalog];
        
        if(cat !== 'all') all = all.filter(p => p.c === cat);

        grid.innerHTML = all.map(p => `
            <div class="card-n">
                <span class="free-shipping">Envío Gratis</span>
                <div class="p-icon">${p.i}</div>
                <div style="font-weight:bold; margin-top:5px;">${p.n}</div>
                <div style="font-size:12px; color:gray;">${p.s}</div>
                <div class="price-tag">
                    <b>C$ ${p.p}</b>
                    <button class="add-btn" onclick="alert('Agregado al carrito')">+</button>
                </div>
            </div>
        `).join('');
    },

    filter(cat) {
        this.render(cat);
    },

    nav(target) {
        // Aquí podés agregar el panel de perfil para registrar productos
        if(target === 'profile') {
            const name = prompt("Registrar producto (Nombre):");
            if(name) {
                const data = this.db.get();
                data.customProducts.push({
                    id: Date.now(),
                    n: name,
                    p: 100,
                    s: "Mi Negocio",
                    i: "🏪",
                    c: "comida"
                });
                this.db.save(data);
                this.render();
            }
        }
    }
};

window.onload = () => App.init();
