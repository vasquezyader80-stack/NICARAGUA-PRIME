const NicaApp = {
    // Persistencia de datos en LocalStorage
    state: JSON.parse(localStorage.getItem('NicaPrime_Pro')) || {
        userName: "Yader Stack",
        cacaos: 150,
        cart: [],
        products: [
            { id: 1, name: "Quesillo Trenzado", price: 85, desc: "Fresco de La Paz Centro", emoji: "🧀" },
            { id: 2, name: "Café Molido Pro", price: 120, desc: "Grano de Matagalpa", emoji: "☕" }
        ]
    },

    init() {
        this.renderProducts();
        this.updateUI();
    },

    save() {
        localStorage.setItem('NicaPrime_Pro', JSON.stringify(this.state));
    },

    updateUI() {
        document.getElementById('cacao-bal').innerText = this.state.cacaos;
    },

    renderProducts() {
        const container = document.getElementById('product-list');
        container.innerHTML = this.state.products.map(p => `
            <div class="product-card">
                <div class="product-img">${p.emoji}</div>
                <div class="product-info">
                    <h4>${p.name}</h4>
                    <p>${p.desc}</p>
                    <p class="price">C$ ${p.price}</p>
                </div>
                <button onclick="NicaApp.addToCart(${p.id})" style="border:none; background:none; padding:20px; color:#e0004d; font-size:1.5rem">+</button>
            </div>
        `).join('');
    },

    addToCart(id) {
        const prod = this.state.products.find(p => p.id === id);
        this.state.cart.push(prod);
        this.state.cacaos += 10; // Gana cacaos por usar la app
        this.save();
        this.updateUI();
        alert(🛒 ${prod.name} añadido al carrito);
    }
};

window.onload = () => NicaApp.init(); 
