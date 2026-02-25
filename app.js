const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_Elite_DB')) || {
        cacaos: 250,
        cart: [],
        products: [
            { id: 1, name: "Quesillo Trenzado", price: 95, cat: "lácteos", img: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400" },
            { id: 2, name: "Café Matagalpa", price: 140, cat: "café", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" },
            { id: 3, name: "Nacatamal de Cerdo", price: 85, cat: "comida", img: "https://images.unsplash.com/photo-1599974590225-2af2fe2030f2?w=400" },
            { id: 4, name: "Hamaca de Masaya", price: 1250, cat: "artesanía", img: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=400" },
            { id: 5, name: "Cuajada Fresca", price: 50, cat: "lácteos", img: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=400" }
        ]
    },

    init() {
        // Splash Screen: 2.5 segundos de elegancia
        setTimeout(() => {
            const splash = document.getElementById('splash');
            splash.style.opacity = '0';
            setTimeout(() => splash.style.display = 'none', 600);
        }, 2500);

        this.render();
        this.sync();
    },

    sync() {
        document.getElementById('cacao-count').innerText = this.state.cacaos;
        document.getElementById('cart-badge').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_Elite_DB', JSON.stringify(this.state));
    },

    render(data = this.state.products) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = data.map(p => `
            <div class="p-card">
                <img src="${p.img}" class="p-img">
                <div class="p-info">
                    <h4>${p.name}</h4>
                    <span class="p-price">C$ ${p.price}</span>
                    <button class="add-btn" onclick="PinolApp.addToCart(${p.id})">Añadir</button>
                </div>
            </div>
        `).join('');
    },

    search() {
        const val = document.getElementById('main-search').value.toLowerCase();
        const filtered = this.state.products.filter(p => p.name.toLowerCase().includes(val));
        this.render(filtered);
    },

    filter(cat) {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        event.target.classList.add('active');
        const res = cat === 'todos' ? this.state.products : this.state.products.filter(p => p.cat === cat);
        this.render(res);
    },

    addToCart(id) {
        const p = this.state.products.find(item => item.id === id);
        this.state.cart.push(p);
        this.state.cacaos += 20; // Recompensa Pinol por cada compra
        this.sync();
        this.toggleCart();
    },

    toggleCart() {
        document.getElementById('cart-drawer').classList.toggle('open');
        this.renderCart();
    },

    renderCart() {
        const list = document.getElementById('cart-content');
        let total = 0;
        list.innerHTML = this.state.cart.length ? this.state.cart.map(i => {
            total += i.price;
            return `<div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #f9f9f9; padding-bottom:10px;">
                        <div><p style="margin:0;font-weight:600">${i.name}</p><small style="color:#888">C$ ${i.price}</small></div>
                        <button onclick="PinolApp.removeItem(${i.id})" style="border:none;background:none;color:red">✕</button>
                    </div>`;
        }).join('') : '<p style="text-align:center; color:#999; margin-top:50px">Tu carrito Pinol está vacío</p>';
        document.getElementById('sub-total').innerText = `C$ ${total}`;
    },

    checkout() {
        if(!this.state.cart.length) return;
        alert("🇳🇮 ¡Pedido Realizado!\n\nGracias por apoyar lo nuestro. Un repartidor de Pinol llevará tu pedido pronto.");
        this.state.cart = [];
        this.toggleCart();
        this.sync();
    },

    openVendor() {
        alert("Módulo Vendedor - Yader Vasquez\nPróximamente podrás gestionar tus propias ventas.");
    },

    showWallet() {
        alert(`🪙 Saldo Pinol: ${this.state.cacaos} Cacaos\n\n¡Sigue acumulando puntos por tus compras!`);
    }
};

window.onload = () => PinolApp.init();
