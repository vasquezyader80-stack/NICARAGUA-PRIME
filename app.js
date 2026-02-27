const App = {
    // PERSISTENCIA: Datos guardados en el teléfono
    db: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_DB')) || {
            user: "Cliente Nica",
            isSocio: false,
            cart: null,
            orders: [],
            socioProducts: [] // Productos que suben los negocios
        },
        save: (data) => localStorage.setItem('PinolApp_DB', JSON.stringify(data))
    },

    // PRODUCTOS PRECARGADOS (Ejemplos)
    catalog: [
        { id: 101, name: "Carne Asada Completa", price: 180, store: "Fritanga Doña Tania", cat: "comida" },
        { id: 102, name: "Pago de Recibo ENATREL", price: 0, store: "Servicios Pinol", cat: "pagos" },
        { id: 103, name: "Mandado Express (Hasta 5km)", price: 80, store: "Motorizados Ya", cat: "mandados" }
    ],

    init() {
        const state = this.db.get();
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 2000);

        this.renderMarketplace();
        this.renderOrders();
    },

    // 1. FUNCIONES DEL CLIENTE
    renderMarketplace() {
        const state = this.db.get();
        const grid = document.getElementById('store-grid');
        // Unir productos del sistema con los que suben los socios
        const allItems = [...this.catalog, ...state.socioProducts];
        
        grid.innerHTML = allItems.map(p => `
            <div class="product-card" onclick="App.prepCheckout('${p.name}', ${p.price}, '${p.store}')">
                <div class="p-img">📸</div>
                <div class="p-info">
                    <b>${p.name}</b>
                    <small>${p.store}</small>
                    <span class="price">C$ ${p.price}</span>
                </div>
                <button class="add-btn">+</button>
            </div>
        `).join('');
    },

    prepCheckout(name, price, store) {
        const subtotal = price;
        const delivery = 45;
        const fee = 10;
        const total = subtotal + delivery + fee;

        document.getElementById('checkout-details').innerHTML = `
            <b>Producto:</b> ${name}<br>
            <small>Vendido por: ${store}</small>
        `;
        document.getElementById('sub-price').innerText = `C$ ${subtotal}`;
        document.getElementById('total-price').innerText = `C$ ${total}`;
        
        // Guardar temporalmente el carrito
        const state = this.db.get();
        state.cart = { name, total, store };
        this.db.save(state);

        this.navigate('checkout');
    },

    processOrder() {
        const state = this.db.get();
        if(!state.cart) return;

        const method = document.querySelector('input[name="pay"]:checked').value;
        const newOrder = {
            id: Math.floor(Math.random() * 900000),
            item: state.cart.name,
            total: state.cart.total,
            status: "Buscando Delivery... 🛵",
            payment: method
        };

        state.orders.unshift(newOrder);
        state.cart = null;
        this.db.save(state);

        alert("¡Pedido realizado con éxito! Un motorizado lo recogerá pronto.");
        this.renderOrders();
        this.navigate('orders');

        // Simulación de cambio de estado
        setTimeout(() => {
            const s = this.db.get();
            s.orders[0].status = "Motorizado en camino al local 🏪";
            this.db.save(s);
            this.renderOrders();
        }, 4000);
    },

    renderOrders() {
        const state = this.db.get();
        const container = document.getElementById('order-history');
        container.innerHTML = state.orders.map(o => `
            <div class="order-tracker">
                <div class="ot-header">
                    <b>ID #${o.id}</b>
                    <span class="badge">${o.status}</span>
                </div>
                <p>${o.item} - <b>Total: C$ ${o.total}</b></p>
                <small>Pago: ${o.payment}</small>
            </div>
        `).join('');    
    },

    // 2. FUNCIONES DEL SOCIO (AFILIACIONES)
    addSocioProduct() {
        const name = document.getElementById('p-name').value;
        const price = document.getElementById('p-price').value;
        const desc = document.getElementById('p-desc').value;

        if(!name || !price) return alert("Completa los datos del producto.");

        const state = this.db.get();
        const newProd = {
            id: Date.now(),
            name: name,
            price: parseInt(price),
            store: state.bizName || "Mi Negocio Afiliado",
            cat: "comida"
        };

        state.socioProducts.unshift(newProd);
        this.db.save(state);
        
        alert("Producto subido. Ahora los clientes pueden verlo en la tienda principal.");
        this.renderMarketplace();
        this.renderSocioList();
        
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
    },

    renderSocioList() {
        const state = this.db.get();
        const container = document.getElementById('socio-items-list');
        container.innerHTML = state.socioProducts.map(p => `
            <div class="socio-item">
                <span>${p.name} - C$ ${p.price}</span>
                <button onclick="App.deleteProd(${p.id})">🗑️</button>
            </div>
        `).join('');
    },

    // NAVEGACIÓN
    navigate(viewId, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        if(btn) {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        if(viewId === 'socio') this.renderSocioList();
    }
};

window.onload = () => App.init();
