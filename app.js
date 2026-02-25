const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_Store_Yader')) || {
        cart: [],
        shops: [
            { id: 1, name: "Tip-Top", desc: "Pollo frito nicaragüense", img: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=400", items: [{n: "Combo Clásico", p: 180}, {n: "Pechugas Pro", p: 250}] },
            { id: 2, name: "Super Express", desc: "Pulpería y conveniencia", img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400", items: [{n: "Leche Litro", p: 35}, {n: "Pan de Molde", p: 60}] },
            { id: 3, name: "La Colonia", desc: "Supermercado nacional", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400", items: [{n: "Café 1lb", p: 130}, {n: "Arroz 10lb", p: 180}] }
        ]
    },

    init() {
        setTimeout(() => { document.getElementById('splash').style.display = 'none'; }, 2000);
        this.renderShops();
        this.sync();
    },

    sync() {
        document.getElementById('cart-qty').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_Store_Yader', JSON.stringify(this.state));
    },

    renderShops() {
        const grid = document.getElementById('shop-grid');
        grid.innerHTML = this.state.shops.map(s => `
            <div class="shop-card" onclick="PinolApp.openMenu(${s.id})">
                <img src="${s.img}">
                <div class="shop-info">
                    <h4>${s.name}</h4>
                    <p style="color:#666; font-size:0.8rem;">${s.desc}</p>
                    <span style="color:green; font-weight:bold;">Abierto</span>
                </div>
            </div>
        `).join('');
    },

    openMenu(id) {
        const shop = this.state.shops.find(s => s.id === id);
        document.getElementById('view-shops').style.display = 'none';
        document.getElementById('view-menu').style.display = 'block';
        
        document.getElementById('shop-header-info').innerHTML = `<h2>${shop.name}</h2><p>${shop.desc}</p>`;
        
        const list = document.getElementById('product-list');
        list.innerHTML = shop.items.map(item => `
            <div class="product-item">
                <img src="https://via.placeholder.com/60?text=Pinol">
                <div>
                    <b>${item.n}</b><br>
                    <span style="color:var(--red)">C$ ${item.p}</span>
                </div>
                <button class="btn-add" onclick="PinolApp.addToCart('${item.n}', ${item.p})">+</button>
            </div>
        `).join('');
    },

    showShops() {
        document.getElementById('view-shops').style.display = 'block';
        document.getElementById('view-menu').style.display = 'none';
    },

    addToCart(name, price) {
        this.state.cart.push({name, price});
        this.sync();
    },

    toggleCart() { document.getElementById('cart-drawer').classList.toggle('active'); this.renderCart(); },

    renderCart() {
        const body = document.getElementById('cart-body');
        let total = 0;
        body.innerHTML = this.state.cart.map(i => {
            total += i.price;
            return `<div style="padding:10px; border-bottom:1px solid #eee;">${i.name} - <b>C$ ${i.price}</b></div>`;
        }).join('') || '<p>Carrito vacío</p>';
        document.getElementById('cart-total').innerText = `C$ ${total}`;
    },

    checkout() {
        alert("🇳🇮 ¡Pedido confirmado!\n\nGracias por comprar en Pinol app. Yader Vasquez te desea buen provecho.");
        this.state.cart = [];
        this.sync();
        this.toggleCart();
    },

    registerShop() {
        const name = document.getElementById('reg-name').value;
        const desc = document.getElementById('reg-desc').value;
        if(!name) return;
        
        const newShop = {
            id: Date.now(),
            name: name,
            desc: desc,
            img: "https://via.placeholder.com/400x140?text=Nuevo+Negocio",
            items: [{n: "Producto Inicial", p: 100}]
        };
        this.state.shops.unshift(newShop);
        this.sync();
        this.renderShops();
        this.toggleModal();
        alert("¡Negocio registrado!");
    },

    toggleModal() {
        const m = document.getElementById('modal-reg');
        m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
    }
};

window.onload = () => PinolApp.init();
