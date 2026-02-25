const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_DB_Yader')) || {
        balance: 500,
        cart: [],
        products: [
            { id: 1, name: "Quesillo La Paz Centro", price: 85, cat: "lácteos", img: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=300" },
            { id: 2, name: "Cacao con Leche", price: 45, cat: "bebidas", img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=300" },
            { id: 3, name: "Café Prestigio", price: 120, cat: "bebidas", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300" },
            { id: 4, name: "Vigorón Granadino", price: 90, cat: "comida", img: "https://images.unsplash.com/photo-1599974590225-2af2fe2030f2?w=300" }
        ]
    },

    init() {
        setTimeout(() => { document.getElementById('splash').style.display = 'none'; }, 2000);
        this.render();
        this.updateUI();
    },

    updateUI() {
        document.getElementById('user-money').innerText = `C$ ${this.state.balance}`;
        document.getElementById('cart-count').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_DB_Yader', JSON.stringify(this.state));
    },

    render(items = this.state.products) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = items.map(p => `
            <div class="card">
                <img src="${p.img}">
                <h4>${p.name}</h4>
                <p>C$ ${p.price}</p>
                <button onclick="PinolApp.addToCart(${p.id})" style="width:100%; margin-top:8px; border:1px solid #e60045; color:#e60045; background:none; border-radius:5px; font-weight:bold;">Añadir</button>
            </div>
        `).join('');
    },

    registerProduct() {
        const name = document.getElementById('reg-name').value;
        const price = document.getElementById('reg-price').value;
        const cat = document.getElementById('reg-cat').value;

        if(!name || !price) return alert("Por favor llena los datos");

        const newP = {
            id: Date.now(),
            name,
            price: parseInt(price),
            cat,
            img: "https://via.placeholder.com/300?text=Pinol+app"
        };

        this.state.products.unshift(newP);
        this.toggleModal();
        this.render();
        this.updateUI();
        alert("¡Producto registrado por Yader Vasquez!");
    },

    addToCart(id) {
        const p = this.state.products.find(x => x.id === id);
        this.state.cart.push(p);
        this.updateUI();
        alert(`${p.name} al carrito`);
    },

    toggleModal() {
        const m = document.getElementById('vendor-modal');
        m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
    },

    toggleCart() { document.getElementById('cart-drawer').classList.toggle('open'); this.renderCart(); },

    renderCart() {
        const list = document.getElementById('cart-items');
        let total = 0;
        list.innerHTML = this.state.cart.map(i => {
            total += i.price;
            return `<div style="padding:10px; border-bottom:1px solid #eee;">${i.name} - <b>C$ ${i.price}</b></div>`;
        }).join('');
        document.getElementById('cart-total').innerText = `C$ ${total}`;
    },

    search() {
        const q = document.getElementById('search-input').value.toLowerCase();
        const f = this.state.products.filter(p => p.name.toLowerCase().includes(q));
        this.render(f);
    },

    filter(cat) {
        const f = cat === 'todos' ? this.state.products : this.state.products.filter(p => p.cat === cat);
        this.render(f);
    }
};

window.onload = () => PinolApp.init();
