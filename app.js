const App = {
    // 1. BASE DE DATOS CENTRALIZADA
    db: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_v5_Core')) || {
            user: "Invitado",
            biz: "N/A",
            isSocio: false,
            orders: [],
            myItems: [] // Productos creados por el socio
        },
        save: (data) => localStorage.setItem('PinolApp_v5_Core', JSON.stringify(data))
    },

    // 2. PRODUCTOS DE FÁBRICA
    baseProducts: [
        { id: 1, name: "Cena Típica Nica", price: 180, cat: "comida", store: "Fritanga Doña Tania" },
        { id: 2, name: "Pollo Entero Rostizado", price: 450, cat: "comida", store: "Tip-Top" },
        { id: 3, name: "Arroz 10 Lbs", price: 165, cat: "super", store: "La Colonia" }
    ],

    init() {
        const session = this.db.get();
        this.updateUI(session);

        // Splash Anim
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('main-app').style.display = 'block';
            }, 500);
        }, 2200);

        this.renderMarketplace();
    },

    // 3. LÓGICA DE INVENTARIO (Nivel Socio)
    addItem() {
        const name = document.getElementById('inv-name').value;
        const price = document.getElementById('inv-price').value;
        const cat = document.getElementById('inv-cat').value;

        if(!name || !price) return alert("Por favor completa los detalles del producto.");

        const session = this.db.get();
        const newItem = { id: Date.now(), name, price, cat, store: session.biz };
        
        session.myItems.unshift(newItem);
        this.db.save(session);
        
        alert("¡Producto publicado exitosamente!");
        this.renderMarketplace();
        this.renderMyInventory();
        
        // Limpiar campos
        document.getElementById('inv-name').value = "";
        document.getElementById('inv-price').value = "";
    },

    renderMarketplace() {
        const session = this.db.get();
        const grid = document.getElementById('global-grid');
        // Unir productos base con los creados por el usuario
        const allItems = [...session.myItems, ...this.baseProducts];
        
        grid.innerHTML = allItems.map(p => `
            <div class="card-item" onclick="App.buy('${p.name}', ${p.price})">
                <div>
                    <b style="font-size:1.1rem">${p.name}</b><br>
                    <small style="color:#888">${p.store}</small>
                </div>
                <b style="color:var(--p)">C$ ${p.price}</b>
            </div>
        `).join('');
    },

    renderMyInventory() {
        const session = this.db.get();
        const container = document.getElementById('my-products');
        container.innerHTML = session.myItems.map(p => `
            <div class="card-item" style="margin-bottom:10px; background:#f9f9f9;">
                <span>${p.name} - C$ ${p.price}</span>
                <button onclick="App.deleteItem(${p.id})" style="color:red; background:none; border:none; font-weight:800;">X</button>
            </div>
        `).join('');
    },

    // 4. LÓGICA DE PEDIDOS
    buy(name, price) {
        const session = this.db.get();
        const order = { 
            id: Math.floor(1000 + Math.random() * 9000), 
            product: name, 
            status: "Procesando ⏳", 
            total: price + 40 // + Envío
        };
        session.orders.unshift(order);
        this.db.save(session);
        this.renderOrders();
        this.navigate('orders');
        
        setTimeout(() => {
            const cur = this.db.get();
            cur.orders[0].status = "En camino 🛵";
            this.db.save(cur);
            this.renderOrders();
        }, 5000);
    },

    renderOrders() {
        const container = document.getElementById('order-stack');
        const session = this.db.get();
        if(session.orders.length === 0) {
            container.innerHTML = "<p style='text-align:center; padding:50px; color:#aaa;'>Sin pedidos activos.</p>";
            return;
        }
        container.innerHTML = session.orders.map(o => `
            <div class="card-item" style="border-left: 5px solid orange; margin-bottom:12px;">
                <div>
                    <b>ORDEN #${o.id}</b><br>
                    <small>${o.product}</small>
                </div>
                <div style="text-align:right">
                    <b style="color:orange">${o.status}</b><br>
                    <small>Total: C$ ${o.total}</small>
                </div>
            </div>
        `).join('');
    },

    // 5. UTILIDADES DE SISTEMA
    navigate(id, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${id}`).classList.add('active');
        if(btn) {
            document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        if(id === 'inventory') this.renderMyInventory();
    },

    openReg() { document.getElementById('modal-reg').style.display = 'flex'; },
    closeReg() { document.getElementById('modal-reg').style.display = 'none'; },

    saveReg() {
        const name = document.getElementById('reg-name').value;
        const biz = document.getElementById('reg-biz').value;
        if(!name || !biz) return alert("Completa los datos.");

        const session = this.db.get();
        session.user = name;
        session.biz = biz;
        session.isSocio = true;
        this.db.save(session);
        location.reload();
    },

    updateUI(s) {
        document.getElementById('user-name-display').innerText = s.user;
        document.getElementById('user-status-display').innerText = s.isSocio ? `Socio de: ${s.biz}` : "Cliente Visitante";
        document.getElementById('user-initials').innerText = s.user.charAt(0).toUpperCase();
        if(s.isSocio) document.getElementById('nav-inv-btn').style.display = 'flex';
    },

    deleteItem(id) {
        const session = this.db.get();
        session.myItems = session.myItems.filter(p => p.id !== id);
        this.db.save(session);
        this.renderMyInventory();
        this.renderMarketplace();
    }
};

window.onload = () => App.init();
       
