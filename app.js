const NicaApp = {
    state: JSON.parse(localStorage.getItem('NicaMarket_v4_Elite')) || {
        cacaos: 200,
        cart: [],
        products: [
            { id: 1, name: "Quesillo Trenzado León", price: 95, cat: "lácteos", img: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400", shop: "Lácteos El Güegüense" },
            { id: 2, name: "Café Matagalpa Orgánico", price: 140, cat: "café", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400", shop: "Selva Norte" },
            { id: 3, name: "Nacatamal Tradicional", price: 85, cat: "comida", img: "https://images.unsplash.com/photo-1599974590225-2af2fe2030f2?w=400", shop: "Antojitos de mi Tierra" },
            { id: 4, name: "Hamaca de Masaya Pro", price: 1250, cat: "artesanía", img: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=400", shop: "Artesanías Monimbó" },
            { id: 5, name: "Cuajada con Chile", price: 45, cat: "lácteos", img: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=400", shop: "Distribuidora Nica" }
        ]
    },

    init() {
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => document.getElementById('splash').style.display = 'none', 500);
        }, 2000);

        this.render();
        this.syncUI();
    },

    syncUI() {
        document.getElementById('cacao-count').innerText = this.state.cacaos;
        document.getElementById('cart-badge').innerText = this.state.cart.length;
        localStorage.setItem('NicaMarket_v4_Elite', JSON.stringify(this.state));
    },

    render(data = this.state.products) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = data.map(p => `
            <div class="p-card">
                <img src="${p.img}" class="p-img">
                <div class="p-info">
                    <h4>${p.name}</h4>
                    <span class="p-price">C$ ${p.price}</span>
                    <button class="add-btn" onclick="NicaApp.addToCart(${p.id})">Añadir</button>
                </div>
            </div>
        `).join('');
    },

    search() {
        const val = document.getElementById('main-search').value.toLowerCase();
        const res = this.state.products.filter(p => p.name.toLowerCase().includes(val));
        this.render(res);
    },

    filter(cat) {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        event.target.classList.add('active');
        const res = cat === 'todos' ? this.state.products : this.state.products.filter(p => p.cat === cat);
        this.render(res);
    },

    addToCart(id) {
        const prod = this.state.products.find(p => p.id === id);
        this.state.cart.push(prod);
        this.state.cacaos += 15; // Incentivo por compra
        this.syncUI();
        this.toggleCart();
    },

    toggleCart() {
        document.getElementById('cart-drawer').classList.toggle('open');
        this.renderCart();
    },

    renderCart() {
        const list = document.getElementById('cart-content');
        let sub = 0;
        list.innerHTML = this.state.cart.length ? this.state.cart.map(i => {
            sub += i.price;
            return `<div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #f9f9f9; padding-bottom:10px;">
                        <div><p style="margin:0;font-weight:600">${i.name}</p><small style="color:#888">C$ ${i.price}</small></div>
                        <button onclick="NicaApp.removeItem(${i.id})" style="border:none;background:none;color:red">✕</button>
                    </div>`;
        }).join('') : '<p style="text-align:center; color:#999; margin-top:50px">Tu carrito está vacío</p>';
        document.getElementById('sub-total').innerText = `C$ ${sub}`;
    },

    checkout() {
        if(!this.state.cart.length) return;
        alert("📍 ¡Pedido enviado exitosamente!\n\nUn repartidor de NicaMarket Pro llegará a tu ubicación en 30-45 min.");
        this.state.cart = [];
        this.toggleCart();
        this.syncUI();
    },

    openVendor() {
        alert("💼 Módulo Vendedor: Estamos verificando tu identidad. Pronto podrás subir tus propios productos.");
    },

    showWallet() {
        alert(`🪙 Saldo Actual: ${this.state.cacaos} Cacaos\n\nEquivalente a C$ ${this.state.cacaos / 2}\n¡Sigue comprando para ganar más!`);
    }
};

window.onload = () => NicaApp.init();
