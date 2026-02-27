const App = {
    // 1. DATABASE (Persistencia Real en Navegador)
    state: {
        get: () => JSON.parse(localStorage.getItem('Pinol_DB_v7')) || {
            user: "Yader",
            bizName: "Fritanga Nica",
            orders: [],
            inventory: [] // Lo que el socio sube
        },
        save: (data) => localStorage.setItem('Pinol_DB_v7', JSON.stringify(data))
    },

    // 2. PRODUCTOS DE EJEMPLO (COMERCIOS ANCLA)
    baseProducts: [
        { id: 101, n: "Gallo Pinto c/ Carne", p: 150, s: "Fritanga Doña Tania", c: "comida" },
        { id: 102, n: "Pago de Luz/Agua", p: 50, s: "Mensajería Express", c: "servicios" },
        { id: 103, n: "Queso Crema (Libra)", p: 95, s: "Lácteos El Vaquero", c: "comida" }
    ],

    init() {
        const data = this.state.get();
        // Simulación de carga profesional
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 600);
        }, 2200);

        this.renderMarket();
        this.renderOrders();
    },

    // 3. FLUJO DEL CLIENTE
    renderMarket() {
        const data = this.state.get();
        const grid = document.getElementById('marketplace-grid');
        const allItems = [...data.inventory, ...this.baseProducts];
        
        grid.innerHTML = allItems.map(p => `
            <div class="product-card" onclick="App.openCheckout('${p.n}', ${p.p}, '${p.s}')">
                <div class="p-icon">🍱</div>
                <div class="p-data">
                    <b>${p.n}</b>
                    <small>${p.s || 'Socio Afiliado'}</small>
                    <span class="p-price">C$ ${p.p}</span>
                </div>
                <button class="add-btn">+</button>
            </div>
        `).join('');
    },

    openCheckout(name, price, store) {
        const total = price + 45; // Precio + Envío Fijo
        document.getElementById('checkout-body').innerHTML = `
            <div class="item-line">
                <span><b>${name}</b><br><small>${store}</small></span>
                <b>C$ ${price}</b>
            </div>
        `;
        document.getElementById('t-sub').innerText = `C$ ${price}`;
        document.getElementById('t-total').innerText = `C$ ${total}`;
        
        this.tempOrder = { n: name, p: price, s: store, t: total };
        document.getElementById('checkout-modal').classList.add('active');
    },

    confirmOrder() {
        const data = this.state.get();
        const newOrder = {
            id: Math.floor(1000 + Math.random() * 9000),
            item: this.tempOrder.n,
            status: "Buscando Motorizado... 🛵",
            total: this.tempOrder.t
        };
        data.orders.unshift(newOrder);
        this.state.save(data);
        
        document.getElementById('checkout-modal').classList.remove('active');
        this.renderOrders();
        this.navigate('orders');
        
        // Simulación de respuesta logística
        setTimeout(() => {
            const current = this.state.get();
            current.orders[0].status = "Motorizado en camino 🚩";
            this.state.save(current);
            this.renderOrders();
        }, 5000);
    },

    renderOrders() {
        const data = this.state.get();
        const container = document.getElementById('tracking-list');
        container.innerHTML = data.orders.map(o => `
            <div class="order-item">
                <div class="o-head">
                    <b>ORDEN #${o.id}</b>
                    <span class="o-status">${o.status}</span>
                </div>
                <p>${o.item}</p>
                <b>Total: C$ ${o.total}</b>
            </div>
        `).join('');
    },

    // 4. FLUJO DEL SOCIO (AFILIACIÓN)
    socioAddProduct() {
        const name = document.getElementById('p-name').value;
        const price = document.getElementById('p-price').value;
        if(!name || !price) return alert("Error: Datos incompletos.");

        const data = this.state.get();
        const newProd = {
            id: Date.now(),
            n: name,
            p: parseInt(price),
            s: data.bizName,
            c: document.getElementById('p-cat').value
        };
        
        data.inventory.unshift(newProd);
        this.state.save(data);
        
        alert("¡Producto publicado! Ya es visible para los clientes.");
        this.renderMarket();
        this.renderSocioInventory();
        
        // Reset campos
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
    },

    renderSocioInventory() {
        const data = this.state.get();
        const container = document.getElementById('socio-inventory');
        container.innerHTML = data.inventory.map(p => `
            <div class="inv-item">
                <span>${p.n} - C$ ${p.p}</span>
                <button onclick="App.deleteItem(${p.id})">Eliminar</button>
            </div>
        `).join('');
    },

    // 5. UTILIDADES DE NAVEGACIÓN
    navigate(id, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${id}`).classList.add('active');
        
        if(btn) {
            document.querySelectorAll('.dock-item').forEach(d => d.classList.remove('active'));
            btn.classList.add('active');
        }
        if(id === 'socio') this.renderSocioInventory();
    }
};

window.onload = () => App.init();
