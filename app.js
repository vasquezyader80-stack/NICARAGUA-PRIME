const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_Master_Data')) || {
        cart: [],
        shops: [
            { id: 101, name: "Super Express", type: "super", time: "15-25 min", ship: 35, img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500" },
            { id: 102, name: "Quesillos El Pipe", type: "restaurante", time: "20-30 min", ship: 40, img: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=500" },
            { id: 103, name: "Farmacias Value", type: "farmacia", time: "10-20 min", ship: 25, img: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=500" },
            { id: 104, name: "Artesanías Masaya", type: "tienda", time: "40-60 min", ship: 80, img: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=500" }
        ]
    },

    init() {
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
        }, 2500);
        this.renderShops();
        this.sync();
    },

    sync() {
        document.getElementById('cart-qty').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_Master_Data', JSON.stringify(this.state));
    },

    renderShops(items = this.state.shops) {
        const container = document.getElementById('shop-list');
        container.innerHTML = items.map(s => `
            <div class="shop-card" onclick="PinolApp.addToCart('${s.name}')">
                <img src="${s.img}" class="shop-img">
                <div class="shop-info">
                    <h4>${s.name}</h4>
                    <div class="shop-meta">
                        <span>⭐ 4.8</span>
                        <span>•</span>
                        <span>${s.time}</span>
                        <span>•</span>
                        <span class="tag">C$ ${s.ship} Envío</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    search() {
        const query = document.getElementById('global-search').value.toLowerCase();
        const filtered = this.state.shops.filter(s => s.name.toLowerCase().includes(query));
        this.renderShops(filtered);
    },

    filter(type) {
        const filtered = this.state.shops.filter(s => s.type === type);
        this.renderShops(filtered);
    },

    saveToLocalStorage() {
        const name = document.getElementById('reg-name').value;
        const price = document.getElementById('reg-price').value;
        const type = document.getElementById('reg-type').value;

        if(!name) return alert("Ingresa el nombre del negocio");

        const newShop = {
            id: Date.now(),
            name: name,
            type: type,
            time: "Nuevo",
            ship: parseInt(price) || 0,
            img: "https://via.placeholder.com/500x300?text=Pinol+app+Negocio"
        };

        this.state.shops.unshift(newShop);
        this.sync();
        this.renderShops();
        this.closeSellerPanel();
        alert("¡Negocio registrado exitosamente por Yader Vasquez!");
    },

    addToCart(name) {
        this.state.cart.push(name);
        this.sync();
        alert(`Añadiste productos de ${name} a tu pedido.`);
    },

    toggleCart() { document.getElementById('cart-drawer').classList.toggle('active'); this.renderCart(); },
    openSellerPanel() { document.getElementById('seller-modal').style.display = 'flex'; },
    closeSellerPanel() { document.getElementById('seller-modal').style.display = 'none'; },

    renderCart() {
        const body = document.getElementById('cart-body');
        body.innerHTML = this.state.cart.map(i => `<div style="padding:15px; border-bottom:1px solid #eee;">📦 Pedido de: <b>${i}</b></div>`).join('') || '<p style="text-align:center; padding:50px;">No hay pedidos activos.</p>';
    },

    checkout() {
        alert("🇳🇮 Procesando pedido...\n\nGracias por usar Pinol app, la plataforma de Yader Vasquez.");
        this.state.cart = [];
        this.sync();
        this.toggleCart();
    }
};

window.onload = () => PinolApp.init();
