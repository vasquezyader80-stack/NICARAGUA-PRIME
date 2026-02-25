const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_Nacional_DB')) || {
        cart: [],
        brands: [
            {n: "Tip Top", i: "🍗"}, {n: "Eskimo", i: "🍦"}, {n: "Colonia", i: "🛒"}, {n: "Union", i: "🍞"}, {n: "Cainsa", i: "🥩"}
        ],
        shops: [
            { id: 1, name: "Pulpería La Bendición", type: "super", img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500", items: [{n: "Litro Leche", p: 35}, {n: "Arroz Libra", p: 18}] },
            { id: 2, name: "Asados El Shaddai", type: "restaurante", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500", items: [{n: "Cerdo Asado", p: 150}, {n: "Cacao", p: 40}] },
            { id: 3, name: "Artesanías Masaya", type: "artesania", img: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=500", items: [{n: "Hamaca", p: 1200}, {n: "Jarrón", p: 350}] },
            { id: 4, name: "Farmacia El Ahorro", type: "farmacia", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=500", items: [{n: "Suero", p: 25}] },
            { id: 5, name: "Comidería Doña Mary", type: "restaurante", img: "https://images.unsplash.com/photo-1599974590225-2af2fe2030f2?w=500", items: [{n: "Nacatamal", p: 80}] }
        ]
    },

    init() {
        setTimeout(() => document.getElementById('splash').style.display = 'none', 2000);
        this.renderBrands();
        this.renderShops();
        this.updateUI();
    },

    renderBrands() {
        const container = document.getElementById('brands-container');
        container.innerHTML = this.state.brands.map(b => `
            <div class="brand-pill">
                <div class="brand-circle" style="display:flex; align-items:center; justify-content:center; font-size:1.5rem;">${b.i}</div>
                <small>${b.n}</small>
            </div>
        `).join('');
    },

    renderShops(data = this.state.shops) {
        const grid = document.getElementById('shop-grid');
        grid.innerHTML = data.map(s => `
            <div class="shop-card" onclick="PinolApp.openMenu(${s.id})">
                <img src="${s.img}">
                <div class="shop-info">
                    <h4>${s.name}</h4>
                    <p style="font-size:0.65rem; color:#888;">🛵 Envío C$ 35 • 25 min</p>
                </div>
            </div>
        `).join('');
    },

    updateUI() {
        document.getElementById('cart-badge').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_Nacional_DB', JSON.stringify(this.state));
    },

    openMenu(id) {
        const shop = this.state.shops.find(x => x.id === id);
        alert(`Entrando a: ${shop.name}\n\nAquí el cliente vería el catálogo de productos registrados.`);
        // Simulación de agregar al carrito
        this.state.cart.push(shop.items[0]);
        this.updateUI();
    },

    filter(type) {
        const filtered = type === 'todos' ? this.state.shops : this.state.shops.filter(s => s.type === type);
        this.renderShops(filtered);
    },

    toggleCart() { document.getElementById('cart-view').classList.toggle('open'); this.renderCart(); },

    renderCart() {
        const list = document.getElementById('cart-items');
        let total = 0;
        list.innerHTML = this.state.cart.map(i => {
            total += i.price || i.p;
            return `<div style="padding:10px; border-bottom:1px solid #eee;">${i.n} - <b>C$ ${i.p}</b></div>`;
        }).join('') || '<p>Carrito vacío</p>';
        document.getElementById('total-val').innerText = total;
    },

    checkout() {
        alert("🇳🇮 ¡Pedido Realizado!\n\nGracias por usar Pinol app, desarrollada por Yader Vasquez.");
        this.state.cart = [];
        this.updateUI();
        this.toggleCart();
    },

    openAuth() { document.getElementById('auth-drawer').classList.add('open'); },
    closeAuth() { document.getElementById('auth-drawer').classList.remove('open'); },

    processReg() {
        const name = document.getElementById('reg-name').value;
        const cedula = document.getElementById('reg-id').value;
        if(!name || !cedula) return alert("Completa los datos de seguridad.");
        alert(`✅ ¡Registro en espera!\n\nYader Vasquez validará tu identidad (${cedula}) para habilitar tu cuenta.`);
        this.closeAuth();
    }
};

window.onload = () => PinolApp.init();
