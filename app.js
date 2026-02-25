const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_Master_System')) || {
        cart: [],
        shops: [
            { id: 1, name: "Pulpería El Shaddai", cat: "Súper", cedula: "001-123456-0000X", img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400", items: [{n: "Litro de Leche", p: 35}, {n: "Libra de Arroz", p: 18}] },
            { id: 2, name: "Asados Doña Mary", cat: "Comida", cedula: "401-000000-0000A", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400", items: [{n: "Servicio de Res", p: 150}, {n: "Tajadas con Queso", p: 60}] }
        ]
    },

    init() {
        setTimeout(() => document.getElementById('splash').style.display='none', 2000);
        this.renderShops();
    },

    renderShops() {
        const container = document.getElementById('shop-container');
        container.innerHTML = this.state.shops.map(s => `
            <div class="shop-card" onclick="PinolApp.viewMenu(${s.id})">
                <img src="${s.img}">
                <div class="info">
                    <h4>${s.name}</h4>
                    <small>${s.cat} • 🛵 Envío C$ 35</small>
                </div>
            </div>
        `).join('');
    },

    viewMenu(id) {
        const shop = this.state.shops.find(x => x.id === id);
        document.getElementById('shop-view').style.display = 'none';
        document.getElementById('menu-view').style.display = 'block';
        document.getElementById('current-shop-name').innerText = shop.name;
        
        const container = document.getElementById('product-container');
        container.innerHTML = shop.items.map(i => `
            <div class="product-item">
                <span>${i.n}</span>
                <b>C$ ${i.p}</b>
                <button onclick="PinolApp.addToCart('${i.n}', ${i.p})">Agregar</button>
            </div>
        `).join('');
    },

    addToCart(name, price) {
        this.state.cart.push({name, price});
        this.updateCart();
    },

    updateCart() {
        document.getElementById('cart-count').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_Master_System', JSON.stringify(this.state));
    },

    confirmOrder() {
        if(this.state.cart.length === 0) return;
        alert("🇳🇮 ¡Pedido Realizado!\n\nUn delivery está aceptando tu orden. Puedes ver el seguimiento en la pantalla principal.");
        this.state.cart = [];
        this.updateCart();
        document.getElementById('cart-drawer').style.right = "-100%";
        this.startTracking();
    },

    startTracking() {
        const bar = document.getElementById('tracking-bar');
        bar.style.display = 'block';
        let time = 20;
        const interval = setInterval(() => {
            time--;
            document.getElementById('track-timer').innerText = `Llega en ${time} min`;
            if(time <= 0) {
                clearInterval(interval);
                alert("🎁 ¡Tu pedido ha llegado!");
                bar.style.display = 'none';
            }
        }, 1000);
    },

    // Funciones de Modal
    openAuth() { document.getElementById('auth-modal').style.display = 'flex'; },
    closeAuth() { document.getElementById('auth-modal').style.display = 'none'; },
    switchAuth(type) {
        const title = document.getElementById('auth-title');
        title.innerText = type === 'vendedor' ? 'Registra tu Negocio' : 'Registrate como Delivery';
        document.getElementById('biz-name').placeholder = type === 'vendedor' ? 'Nombre del Negocio' : 'Placa de Moto / Vehículo';
    },
    backToShops() {
        document.getElementById('shop-view').style.display = 'block';
        document.getElementById('menu-view').style.display = 'none';
    }
};

window.onload = () => PinolApp.init();
