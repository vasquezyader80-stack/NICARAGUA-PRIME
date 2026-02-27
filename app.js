const App = {
    // 1. BASE DE DATOS LOCAL (PERSISTENCIA)
    db: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_v5')) || {
            user: "Invitado",
            biz: "N/A",
            isSocio: false,
            orders: [],
            myItems: [] // Inventario del Socio
        },
        save: (data) => localStorage.setItem('PinolApp_v5', JSON.stringify(data))
    },

    // PRODUCTOS POR DEFECTO DEL SISTEMA
    baseProducts: [
        { id: 1, name: "Gallo Pinto con Carne", price: 150, cat: "comida", store: "Fritanga Doña Tania" },
        { id: 2, name: "Servicio de Mensajería", price: 60, cat: "servicio", store: "Pinol Express" },
        { id: 3, name: "Combo Pollo Tip-Top", price: 420, cat: "comida", store: "Tip-Top" }
    ],

    init() {
        const session = this.db.get();
        this.updateUI(session);

        // Animación de Entrada Profesional
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('main-app').style.display = 'block';
            }, 500);
        }, 2000);

        this.renderMarketplace();
        this.renderOrders();
    },

    // 2. SISTEMA DE INVENTARIO (Check ✅)
    addItem() {
        const name = document.getElementById('inv-name').value;
        const price = document.getElementById('inv-price').value;
        const cat = document.getElementById('inv-cat').value;

        if(!name || !price) return alert("Error: Datos incompletos.");

        const session = this.db.get();
        const newItem = { 
            id: Date.now(), 
            name: name, 
            price: price, 
            cat: cat, 
            store: session.biz // Usa el nombre de tu negocio registrado
        };
        
        session.myItems.unshift(newItem);
        this.db.save(session);
        
        alert("¡Éxito! Tu producto ya es visible en el Marketplace.");
        this.renderMarketplace();
        this.renderMyInventory();
        
        // Limpiar formulario
        document.getElementById('inv-name').value = "";
        document.getElementById('inv-price').value = "";
    },

    renderMarketplace() {
        const session = this.db.get();
        const grid = document.getElementById('global-grid');
        // Unimos los productos del sistema con los creados por los socios
        const allItems = [...session.myItems, ...this.baseProducts];
        
        grid.innerHTML = allItems.map(p => `
            <div class="card-item" onclick="App.buy('${p.name}', ${p.price})">
                <div class="card-info">
                    <b>${p.name}</b>
                    <small>${p.store} • ${p.cat}</small>
                </div>
                <div class="card-price">C$ ${p.price}</div>
            </div>
        `).join('');
    },

    // 3. SISTEMA DE COMPRAS Y RASTREO
    buy(name, price) {
        const session = this.db.get();
        const orderId = Math.floor(1000 + Math.random() * 9000);
        const order = { 
            id: orderId, 
            product: name, 
            status: "Confirmando...", 
            total: parseInt(price) + 40 // Tarifa envío Nicaragua
        };
        
        session.orders.unshift(order);
        this.db.save(session);
        this.renderOrders();
        this.navigate('orders');
        
        // Simulación de Logística en Vivo
        setTimeout(() => {
            const cur = this.db.get();
            cur.orders[0].status = "En camino 🛵";
            this.db.save(cur);
            this.renderOrders();
        }, 4000);
    },

    renderOrders() {
        const container = document.getElementById('order-stack');
        const session = this.db.get();
        if(session.orders.length === 0) {
            container.innerHTML = "<div class='empty-msg'>No tienes pedidos hoy.</div>";
            return;
        }
        container.innerHTML = session.orders.map(o => `
            <div class="order-card">
                <div class="order-header">
                    <b>ORDEN #${o.id}</b>
                    <span class="status-tag">${o.status}</span>
                </div>
                <p>${o.product}</p>
                <div class="order-footer">
                    <span>Total pagado: C$ ${o.total}</span>
                    <button onclick="alert('Llamando al motorizado...')">Llamar 📞</button>
                </div>
            </div>
        `).join('');
    },

    // 4. FUNCIONES DE PERFIL Y NAVEGACIÓN
    updateUI(s) {
        document.getElementById('user-name-display').innerText = s.user;
        document.getElementById('user-status-display').innerText = s.isSocio ? `Socio de: ${s.biz}` : "Usuario Cliente";
        document.getElementById('user-initials').innerText = s.user.charAt(0).toUpperCase();
        
        // Si es socio, mostramos el botón de gestión de inventario
        if(s.isSocio) document.getElementById('nav-inv-btn').style.display = 'flex';
    },

    saveReg() {
        const name = document.getElementById('reg-name').value;
        const biz = document.getElementById('reg-biz').value;
        if(!name || !biz) return alert("Completa los campos.");

        const session = this.db.get();
        session.user = name;
        session.biz = biz;
        session.isSocio = true;
        this.db.save(session);
        location.reload();
    },

    navigate(id, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${id}`).classList.add('active');
        if(btn) {
            document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        if(id === 'inventory') this.renderMyInventory();
    },

    renderMyInventory() {
        const session = this.db.get();
        const container = document.getElementById('my-products');
        container.innerHTML = session.myItems.map(p => `
            <div class="inv-item">
                <span>${p.name} - C$ ${p.price}</span>
                <button onclick="App.deleteItem(${p.id})">Eliminar</button>
            </div>
        `).join('');
    },

    deleteItem(id) {
        const session = this.db.get();
        session.myItems = session.myItems.filter(p => p.id !== id);
        this.db.save(session);
        this.renderMyInventory();
        this.renderMarketplace();
    },

    openReg() { document.getElementById('modal-reg').style.display = 'flex'; },
    closeReg() { document.getElementById('modal-reg').style.display = 'none'; },
    clearData() { localStorage.clear(); location.reload(); }
};

window.onload = () => App.init();
         
