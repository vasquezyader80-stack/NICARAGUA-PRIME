const App = {
    // 1. DATABASE LOCAL (Persistence)
    storage: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_Elite')) || {
            user: "Yader Vasquez",
            inventory: [
                { id: 101, name: "Quesillo Trenza", price: 85, cat: "Tienda", shop: "Lácteos Chontales" },
                { id: 102, name: "Servicio de Asado", price: 150, cat: "Fritanga", shop: "Fritanga El Norte" }
            ],
            cart: []
        },
        save: (data) => localStorage.setItem('PinolApp_Elite', JSON.stringify(data))
    },

    init() {
        this.render();
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').classList.add('hidden');
                document.getElementById('app').classList.remove('hidden');
            }, 600);
        }, 3000);
    },

    nav(viewId, el) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        if(el) {
            document.querySelectorAll('.dock-item').forEach(d => d.classList.remove('active'));
            el.classList.add('active');
        }
    },

    // 2. LÓGICA DE NEGOCIO (Socio)
    addProduct() {
        const name = document.getElementById('p-name').value;
        const price = document.getElementById('p-price').value;
        const cat = document.getElementById('p-cat').value;

        if(!name || !price) return alert("Por favor complete los datos");

        const data = this.storage.get();
        data.inventory.push({ id: Date.now(), name, price: parseInt(price), cat, shop: "Mi Negocio" });
        this.storage.save(data);
        
        alert("¡Producto Afiliado! Ya está en vivo en Managua.");
        this.render();
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
    },

    // 3. LÓGICA DE COMPRA (Cliente)
    addCart(id) {
        const data = this.storage.get();
        const item = data.inventory.find(p => p.id === id);
        data.cart.push(item);
        this.storage.save(data);
        this.render();
        // Haptic feedback simulado
        console.log("Añadido al pedido");
    },

    render() {
        const data = this.storage.get();
        
        // Cart Badge
        document.getElementById('cart-count').innerText = data.cart.length;
        document.getElementById('cart-dot').innerText = data.cart.length;

        // Feed de Productos
        const feed = document.getElementById('feed-comercial');
        feed.innerHTML = data.inventory.map(p => `
            <div class="p-card">
                <small>${p.cat}</small>
                <h4>${p.name}</h4>
                <div class="p-price">C$ ${p.price}</div>
                <button onclick="App.addCart(${p.id})">+</button>
            </div>
        `).join('');

        // Carrito
        const cartList = document.getElementById('cart-list');
        let subtotal = 0;
        cartList.innerHTML = data.cart.map(item => {
            subtotal += item.price;
            return `<div style="background:white; padding:15px; border-radius:15px; margin-bottom:10px; display:flex; justify-content:space-between;">
                <span>${item.name}</span> <b>C$ ${item.price}</b>
            </div>`;
        }).join('');

        document.getElementById('subtotal').innerText = "C$ " + subtotal;
        document.getElementById('total-final').innerText = "C$ " + (subtotal > 0 ? subtotal + 45 : 0);

        // Inventario del Socio
        const invList = document.getElementById('my-inventory');
        invList.innerHTML = data.inventory.filter(p => p.shop === "Mi Negocio").map(p => `
            <div style="background:white; padding:12px; border-radius:10px; margin-bottom:8px; border-left:4px solid var(--blue);">
                <b>${p.name}</b> - C$ ${p.price}
            </div>
        `).join('');
    },

    processOrder() {
        const data = this.storage.get();
        if(data.cart.length === 0) return alert("Tu carrito está vacío");
        
        alert(`¡Orden confirmada por C$ ${document.getElementById('total-final').innerText}! El repartidor está en camino.`);
        data.cart = [];
        this.storage.save(data);
        this.render();
        this.nav('home');
    }
};

window.onload = () => App.init();
