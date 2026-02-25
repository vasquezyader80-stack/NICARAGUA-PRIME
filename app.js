const NicaApp = {
    // Almacenamiento local avanzado
    state: JSON.parse(localStorage.getItem('NicaMarket_Elite')) || {
        cacaos: 150,
        cart: [],
        products: [
            { id: 1, name: "Quesillo Trenzado Especial", price: 95, cat: "lácteos", img: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400", shop: "Lácteos La Paz" },
            { id: 2, name: "Café Matagalpa Molido", price: 140, cat: "café", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400", shop: "Selva Negra" },
            { id: 3, name: "Nacatamal de Cerdo", price: 85, cat: "comida", img: "https://images.unsplash.com/photo-1599974590225-2af2fe2030f2?w=400", shop: "Antojitos Nicas" },
            { id: 4, name: "Hamaca de Hilo Fino", price: 1150, cat: "artesanía", img: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=400", shop: "Masaya Artesanal" }
        ]
    },

    init() {
        this.render();
        this.syncUI();
    },

    syncUI() {
        document.getElementById('cacao-bal').innerText = this.state.cacaos;
        document.getElementById('cart-count').innerText = this.state.cart.length;
        localStorage.setItem('NicaMarket_Elite', JSON.stringify(this.state));
    },

    render(data = this.state.products) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = data.map(p => `
            <div class="p-card">
                <img src="${p.img}" class="p-img">
                <div class="p-body">
                    <h4>${p.name}</h4>
                    <small>📍 ${p.shop}</small>
                    <span class="p-price">C$ ${p.price}</span>
                    <button class="add-btn" onclick="NicaApp.addToCart(${p.id})">Añadir</button>
                </div>
            </div>
        `).join('');
    },

    search() {
        const val = document.getElementById('search-input').value.toLowerCase();
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
        this.state.cacaos += 10; // Incentivo por usar el carrito
        this.syncUI();
        this.toggleCart();
    },

    toggleCart() {
        document.getElementById('cart-drawer').classList.toggle('active');
        this.renderCart();
    },

    renderCart() {
        const list = document.getElementById('cart-list');
        let sub = 0;
        list.innerHTML = this.state.cart.length ? this.state.cart.map(i => {
            sub += i.price;
            return `<div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                        <span>${i.name}</span><b>C$ ${i.price}</b>
                    </div>`;
        }).join('') : '<p style="color:#999; text-align:center">Tu carrito está vacío</p>';
        document.getElementById('subtotal').innerText = `C$ ${sub}`;
    },

    checkout() {
        if(!this.state.cart.length) return;
        alert("📍 ¡Pedido enviado exitosamente! Un repartidor de NicaMarket Pro se pondrá en contacto.");
        this.state.cart = [];
        this.toggleCart();
        this.syncUI();
    },

    openVendor() {
        alert("💎 Módulo de Vendedor: Próximamente podrás subir tus fotos directamente.");
    }
};

window.onload = () => NicaApp.init();
