const App = {
    // ESTADO DE LA APLICACIÓN (DATABASE LOCAL)
    state: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_DB_V3')) || {
            user: "Yader Vasquez",
            inventory: [
                { id: 1, name: "Vigorón Mixto", price: 120, cat: "Fritanga", store: "El Kiosko" },
                { id: 2, name: "Toña Litro", price: 85, cat: "Mercado", store: "Súper Express" }
            ],
            cart: []
        },
        save: (data) => localStorage.setItem('PinolApp_DB_V3', JSON.stringify(data))
    },

    init() {
        this.refresh();
        // Simular carga de servidor profesional
        setTimeout(() => {
            const splash = document.getElementById('splash');
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
                document.getElementById('app').classList.remove('app-hidden');
            }, 600);
        }, 2800);
    },

    nav(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        if(el) {
            document.querySelectorAll('.dock-item').forEach(d => d.classList.remove('active'));
            el.classList.add('active');
        }
    },

    // LÓGICA DE COMERCIO (Socio)
    registerProduct() {
        const name = document.getElementById('p-name').value;
        const price = document.getElementById('p-price').value;
        const cat = document.getElementById('p-cat').value;

        if(!name || !price) return alert("Error: Debe ingresar nombre y precio real.");

        const db = this.state.get();
        db.inventory.push({
            id: Date.now(),
            name: name,
            price: parseFloat(price),
            cat: cat,
            store: "Mi Negocio Afiliado"
        });
        
        this.state.save(db);
        alert("¡Producto Exaltado! Ya está disponible en la red comercial.");
        this.refresh();
        
        // Limpiar campos
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
    },

    // LÓGICA DE COMPRA (Cliente)
    addToCart(id) {
        const db = this.state.get();
        const item = db.inventory.find(p => p.id === id);
        db.cart.push(item);
        this.state.save(db);
        this.refresh();
        
        // Efecto visual de feedback
        const badge = document.getElementById('cart-badge');
        badge.style.transform = "scale(1.4)";
        setTimeout(() => badge.style.transform = "scale(1)", 200);
    },

    refresh() {
        const db = this.state.get();
        
        // 1. Render Feed Principal
        const grid = document.getElementById('market-grid');
        grid.innerHTML = db.inventory.map(p => `
            <div class="product-card">
                <span class="tag">${p.cat}</span>
                <h4>${p.name}</h4>
                <p class="store-name">${p.store}</p>
                <div class="card-footer">
                    <span class="price">C$ ${p.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="App.addToCart(${p.id})">+</button>
                </div>
            </div>
        `).join('');

        // 2. Render Carrito
        const cartList = document.getElementById('cart-items-list');
        let subtotal = 0;
        cartList.innerHTML = db.cart.map((item, idx) => {
            subtotal += item.price;
            return `<div class="cart-row">
                <span>${item.name}</span>
                <b>C$ ${item.price.toFixed(2)}</b>
            </div>`;
        }).join('') || "<p class='empty-msg'>No hay productos seleccionados.</p>";

        // 3. Cálculos Finales
        const tax = subtotal * 0.15;
        const total = subtotal > 0 ? subtotal + 35 + tax : 0;
        
        document.getElementById('subtotal').innerText = `C$ ${subtotal.toFixed(2)}`;
        document.getElementById('tax').innerText = `C$ ${tax.toFixed(2)}`;
        document.getElementById('total').innerText = `C$ ${total.toFixed(2)}`;
        document.getElementById('cart-badge').innerText = db.cart.length;

        // 4. Inventario del Socio
        const inv = document.getElementById('my-inventory');
        inv.innerHTML = db.inventory.filter(p => p.store === "Mi Negocio Afiliado").map(p => `
            <div class="inventory-card">
                <b>${p.name}</b>
                <span>C$ ${p.price}</span>
            </div>
        `).join('');
    },

    checkout() {
        const db = this.state.get();
        if(db.cart.length === 0) return alert("El carrito está vacío.");
        
        alert("¡Orden Procesada! El comercio ha recibido tu pago en Córdobas.");
        db.cart = [];
        this.state.save(db);
        this.refresh();
        this.nav('home');
    }
};

window.onload = () => App.init();
