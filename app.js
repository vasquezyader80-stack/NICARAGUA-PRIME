const App = {
    // ESTADO DE LA EMPRESA
    state: {
        stores: [
            { id: 1, name: "Tip-Top Metrocentro", cat: "comida", rate: 4.8, img: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=600", desc: "El mejor pollo de Nicaragua", fee: "C$ 40.00" },
            { id: 2, name: "Super La Colonia", cat: "super", rate: 4.6, img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600", desc: "Calidad y Frescura", fee: "C$ 60.00" },
            { id: 3, name: "Fritanga Doña Tania", cat: "comida", rate: 4.9, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600", desc: "Sabor tradicional casero", fee: "C$ 35.00" },
            { id: 4, name: "Beer Home Nicaragua", cat: "bebida", rate: 4.7, img: "https://images.unsplash.com/photo-1505075106905-fb052892c116?w=600", desc: "Tus licores a domicilio", fee: "C$ 50.00" }
        ],
        cart: [],
        sellers: JSON.parse(localStorage.getItem('Pinol_Network_Sellers')) || []
    },

    init() {
        // Ejecutar Animación de Despertar
        setTimeout(() => {
            document.getElementById('splash').style.transform = 'translateY(-100%)';
        }, 2500);

        this.renderStores();
    },

    renderStores(data = [...this.state.stores, ...this.state.sellers]) {
        const grid = document.getElementById('stores-grid');
        grid.innerHTML = data.map(s => `
            <div class="store-card" onclick="App.openStore(${s.id})">
                <img src="${s.img}">
                <div class="store-details">
                    <div style="display:flex; justify-content:space-between;">
                        <span class="badge-rate">⭐ ${s.rate || 'Nuevo'}</span>
                        <small style="color:green; font-weight:700;">${s.fee || 'Envío C$ 30.00'}</small>
                    </div>  
                    <h3 style="margin:10px 0 5px 0;">${s.name}</h3>
                    <p style="font-size:0.8rem; color:#666; margin:0;">${s.desc}</p>
                </div>
            </div>
        `).join('');
    },

    filter(cat) {
        // Despierta el filtrado profesional
        const filtered = cat === 'all' ? [...this.state.stores, ...this.state.sellers] : this.state.stores.filter(s => s.cat === cat);
        this.renderStores(filtered);
    },

    search() {
        const query = document.getElementById('global-search').value.toLowerCase();
        const filtered = this.state.stores.filter(s => s.name.toLowerCase().includes(query) || s.desc.toLowerCase().includes(query));
        this.renderStores(filtered);
    },

    openSellerPortal() {
        document.getElementById('seller-portal').classList.add('active');
    },

    closeSellerPortal() {
        document.getElementById('seller-portal').classList.remove('active');
    },

    registerStore() {
        const name = document.getElementById('biz-name').value;
        const cat = document.getElementById('biz-cat').value;

        if(!name) return alert("Por favor, ingresa el nombre de tu comercio");

        const newSeller = {
            id: Date.now(),
            name: name,
            cat: cat,
            rate: "Nuevo",
            img: "https://images.unsplash.com/photo-1533900298358-e419f655b044?w=600",
            desc: "Nuevo comercio asociado PinolApp",
            fee: "C$ 40.00"
        };

        this.state.sellers.push(newSeller);
        localStorage.setItem('Pinol_Network_Sellers', JSON.stringify(this.state.sellers));
        
        alert("¡Bienvenido Socio! Tu tienda está en proceso de activación.");
        this.closeSellerPortal();
        this.renderStores();
    }
};

window.onload = () => App.init();
