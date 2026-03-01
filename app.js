const App = {
    // 1. DATA PERSISTENCE (Memoria del Teléfono)
    db: {
        data: JSON.parse(localStorage.getItem('Pinol_Core_V2')) || {
            cacaos: 1000,
            inventory: [], // Productos de los socios
            cart: []       // Carrito del cliente
        },
        save() { localStorage.setItem('Pinol_Core_V2', JSON.stringify(this.data)); }
    },

    init() {
        this.renderAll();
        setTimeout(() => {
            document.getElementById('splash').classList.add('hide');
            document.getElementById('app').classList.remove('hidden');
        }, 2500);
    },

    nav(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        if(el) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    },

    // 2. LÓGICA DE COMERCIO (REGISTRO)
    saveProduct() {
        const name = document.getElementById('p-name').value;
        const price = document.getElementById('p-price').value;
        const cat = document.getElementById('p-cat').value;

        if(!name || !price) return alert("Por favor llena todos los campos");

        const newProd = { id: Date.now(), name, price, cat, shop: "Socio Local" };
        this.db.data.inventory.push(newProd);
        this.db.save();
        
        alert("¡Producto Afiliado con éxito! Ya está disponible en la tienda.");
        this.renderAll();
        
        // Limpiar form
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
    },

    // 3. LÓGICA DE COMPRA (CLIENTE)
    addToCart(id) {
        const prod = this.db.data.inventory.find(p => p.id === id);
        this.db.data.cart.push(prod);
        this.db.save();
        this.renderAll();
        alert("Añadido al carrito 🛒");
    },

    // 4. RENDERING (DIBUJAR LA APP)
    renderAll() {
        const data = this.db.data;
        
        // Actualizar Cacaos y Carrito
        document.getElementById('cacaos-val').innerText = data.cacaos;
        document.getElementById('cart-count').innerText = data.cart.length;

        // Render Feed Principal (Lo que ve el cliente)
        const feed = document.getElementById('feed-productos');
        feed.innerHTML = data.inventory.map(p => `
            <div class="p-card">
                <span class="p-cat">${p.cat}</span>
                <h4>${p.name}</h4>
                <div class="p-row">
                    <b>C$ ${p.price}</b>
                    <button onclick="App.addToCart(${p.id})">+</button>
                </div>
            </div>
        `).join('') || "<p class='empty'>No hay productos registrados aún.</p>";

        // Render Carrito
        const cartItems = document.getElementById('cart-items');
        let total = 0;
        cartItems.innerHTML = data.cart.map(item => {
            total += parseInt(item.price);
            return `<div class="cart-item"><span>${item.name}</span> <b>C$ ${item.price}</b></div>`;
        }).join('');
        document.getElementById('total-price').innerText = total;

        // Render Lista del Socio
        const myList = document.getElementById('my-list');
        myList.innerHTML = data.inventory.map(p => `
            <div class="my-item">${p.name} - C$ ${p.price}</div>
        `).join('');
    },

    checkout() {
        if(this.db.data.cart.length === 0) return alert("El carrito está vacío");
        alert("¡Pedido enviado! El restaurante lo está preparando. 🇳🇮");
        this.db.data.cart = [];
        this.db.data.cacaos += 20; // Gana cacaos por comprar
        this.db.save();
        this.renderAll();
        this.nav('inicio');
    }
};

window.onload = () => App.init();
