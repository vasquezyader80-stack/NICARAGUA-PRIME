const App = {
    state: {
        user: JSON.parse(localStorage.getItem('Pinol_User')) || { name: 'Socio Nica', location: 'Managua' },
        cart: [],
        shops: [
            { id: 1, name: "Tip-Top Los Robles", cat: "restaurante", time: "25-35 min", rate: "4.8", img: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=600", tag: "Pollo Frito" },
            { id: 2, name: "Super Express Altamira", cat: "super", time: "15-20 min", rate: "4.5", img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600", tag: "Abarrotes" },
            { id: 3, name: "El Novillo", cat: "restaurante", time: "40-50 min", rate: "4.9", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600", tag: "Cortes de Carne" },
            { id: 4, name: "Compañía Cervecera", cat: "bebida", time: "20-30 min", rate: "4.7", img: "https://images.unsplash.com/photo-1505075106905-fb052892c116?w=600", tag: "Cervezas y Licores" }
        ],
        registeredSellers: JSON.parse(localStorage.getItem('Pinol_Sellers')) || []
    },

    init() {
        // Splash Screen Delay
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => document.getElementById('splash').style.display = 'none', 500);
        }, 2000);

        this.renderShops(this.state.shops);
    },

    renderShops(items) {
        const grid = document.getElementById('shop-grid');
        // Unir tiendas base con tiendas registradas por usuarios
        const allShops = [...items, ...this.state.registeredSellers];
        
        grid.innerHTML = allShops.map(s => `
            <div class="shop-card" onclick="App.openStore(${s.id})">
                <img src="${s.img}">
                <div class="shop-info">
                    <span class="rating">⭐ ${s.rate || 'Nuevo'}</span>
                    <h4>${s.name}</h4>
                    <p><small>${s.tag} • ${s.time || 'Envío gratis'}</small></p>
                    <b style="color:#e60045">Mínimo: C$ 150.00</b>
                </div>
            </div>
        `).join('');
    },

    filter(cat) {
        const filtered = this.state.shops.filter(s => s.cat === cat);
        this.renderShops(filtered);
    },

    search() {
        const query = document.getElementById('main-search').value.toLowerCase();
        const filtered = this.state.shops.filter(s => s.name.toLowerCase().includes(query));
        this.renderShops(filtered);
    },

    toggleSellerModal() {
        const modal = document.getElementById('seller-modal');
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    },

    registerSeller() {
        const name = document.getElementById('biz-name').value;
        const cat = document.getElementById('biz-cat').value;
        
        if(!name) return alert("Ingresa el nombre de tu empresa");

        const newShop = {
            id: Date.now(),
            name: name,
            cat: cat,
            tag: "Negocio Local",
            img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
            rate: "Nuevo"
        };

        this.state.registeredSellers.push(newShop);
        localStorage.setItem('Pinol_Sellers', JSON.stringify(this.state.registeredSellers));
        
        alert("✅ Solicitud recibida. Nuestro equipo de delivery te contactará para validar documentos.");
        this.toggleSellerModal();
        this.renderShops(this.state.shops);
    }
};

window.onload = () => App.init();     
