const NicaApp = {
    state: JSON.parse(localStorage.getItem('NicaMarket_v3')) || {
        cacaos: 100,
        cart: [],
        products: [
            { id: 1, name: "Quesillo Gourmet", price: 110, cat: "comida", img: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=300", vendor: "Quesillos El Pipe" },
            { id: 2, name: "Café Matagalpa 1kg", price: 280, cat: "comida", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300", vendor: "Selva Negra" },
            { id: 3, name: "Calzado de Cuero", price: 850, cat: "cuero", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300", vendor: "Masaya Crafts" },
            { id: 4, name: "Jarra de Barro", price: 350, cat: "artesania", img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300", vendor: "San Juan Pottery" }
        ]
    },

    init() {
        this.render();
        this.updateUI();
    },

    save() {
        localStorage.setItem('NicaMarket_v3', JSON.stringify(this.state));
    },

    updateUI() {
        document.getElementById('cacao-bal').innerText = this.state.cacaos;
        document.getElementById('cart-count').innerText = this.state.cart.length;
        this.save();
    },

    render(items = this.state.products) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = items.map(p => `
            <div class="p-card">
                <img src="${p.img}" class="p-img">
                <div class="p-content">
                    <h4>${p.name}</h4>
                    <small>${p.vendor}</small>
                    <span class="p-price">C$ ${p.price}</span>
                    <button class="add-btn" onclick="NicaApp.addToCart(${p.id})">Añadir</button>
                </div>
            </div>
        `).join('');
    },

    search() {
        const query = document.getElementById('main-search').value.toLowerCase();
        const filtered = this.state.products.filter(p => p.name.toLowerCase().includes(query));
        this.render(filtered);
    },

    addToCart(id) {
        const p = this.state.products.find(prod => prod.id === id);
        this.state.cart.push(p);
        this.state.cacaos += 5; // Premio por compra simulada
        this.updateUI();
        this.toggleCart();
    },

    toggleCart() {
        const panel = document.getElementById('cart-panel');
        panel.classList.toggle('open');
        this.renderCart();
    },

    renderCart() {
        const list = document.getElementById('cart-list');
        let total = 0;
        list.innerHTML = this.state.cart.map(item => {
            total += item.price;
            return `<div style="display:flex; justify:space-between; padding:10px; border-bottom:1px solid #eee;">
                        <span>${item.name}</span> <b>C$ ${item.price}</b>
                    </div>`;
        }).join('');
        document.getElementById('cart-total').innerText = `C$ ${total.toFixed(2)}`;
    },

    checkout() {
        if(this.state.cart.length === 0) return;
        alert("📍 ¡Pedido enviado! Tu producto llegará pronto. Has ganado cacaos.");
        this.state.cart = [];
        this.toggleCart();
        this.updateUI();
    }
};

window.onload = () => NicaApp.init();
