const App = {
    // 1. MOTOR DE DATOS PERSISTENTE
    db: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_Comercial_V1')) || {
            myProducts: [],
            cart: []
        },
        save: (data) => localStorage.setItem('PinolApp_Comercial_V1', JSON.stringify(data))
    },

    // Catálogo inicial de ejemplo
    staticCatalog: [
        { id: 1, n: "Nacatamal de Cerdo", p: 130, c: "Fritanga", s: "Doña Mary" },
        { id: 2, n: "Toña Litro", p: 85, c: "Mercado", s: "Súper Express" },
        { id: 3, n: "Vigorón Granadino", p: 140, c: "Fritanga", s: "El Kiosko" }
    ],

    init() {
        this.render();
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').classList.remove('hidden');
            }, 600);
        }, 3000);
    },

    nav(viewId, el) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        if(el) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    },

    // 2. LÓGICA DE VENTAS (PUBLICAR)
    publish() {
        const title = document.getElementById('p-title').value;
        const price = document.getElementById('p-price').value;
        const cat = document.getElementById('p-category').value;

        if(!title || !price) return alert("Completa los datos del producto");

        const data = this.db.get();
        data.myProducts.push({ id: Date.now(), n: title, p: parseInt(price), c: cat, s: "Tu Negocio" });
        this.db.save(data);
        
        alert("¡Producto Publicado! Ya está en el catálogo nacional.");
        this.render();
        document.getElementById('p-title').value = "";
        document.getElementById('p-price').value = "";
    },

    // 3. LÓGICA DE COMPRAS
    addToCart(id) {
        const data = this.db.get();
        const all = [...this.staticCatalog, ...data.myProducts];
        const product = all.find(p => p.id === id);
        
        data.cart.push(product);
        this.db.save(data);
        this.render();
    },

    render() {
        const data = this.db.get();
        
        // Contador de carrito
        document.getElementById('cart-count').innerText = data.cart.length;

        // Render Catálogo (Explorar)
        const grid = document.getElementById('product-grid');
        const allProducts = [...this.staticCatalog, ...data.myProducts];
        grid.innerHTML = allProducts.map(p => `
            <div class="p-card">
                <span class="p-tag">${p.c}</span>
                <h4>${p.n}</h4>
                <div class="price">C$ ${p.p}</div>
                <button class="add-btn" onclick="App.addToCart(${p.id})">+</button>
            </div>
        `).join('');

        // Render Carrito
        const cartItems = document.getElementById('cart-items');
        let total = 0;
        cartItems.innerHTML = data.cart.map((p, index) => {
            total += p.p;
            return `<div class="cart-item-row" style="display:flex; justify-content:space-between; margin-bottom:10px; background:white; padding:15px; border-radius:15px;">
                <span>${p.n}</span> <b>C$ ${p.p}</b>
            </div>`;
        }).join('') || "<p>Tu carrito está vacío</p>";

        document.getElementById('subtotal').innerText = "C$ " + total;
        document.getElementById('final-total').innerText = "C$ " + (total > 0 ? total + 40 : 0);
    },

    completeOrder() {
        const data = this.db.get();
        if(data.cart.length === 0) return alert("Agrega productos primero");
        alert("¡Pedido Realizado! El comercio ha recibido tu orden en Córdobas.");
        data.cart = [];
        this.db.save(data);
        this.render();
        this.nav('home');
    }
};

window.onload = () => App.init();
