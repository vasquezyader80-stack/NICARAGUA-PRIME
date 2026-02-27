const App = {
    // Memoria persistente de Yader
    store: {
        get: () => JSON.parse(localStorage.getItem('PinolPro_DB')) || { user: null, orders: [], registered: false },
        save: (data) => localStorage.setItem('PinolPro_DB', JSON.stringify(data))
    },

    db: [
        { id: 1, n: "Tip-Top Metrocentro", t: "comida", i: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=400", p: "C$ 210" },
        { id: 2, n: "Super La Colonia", t: "mercado", i: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400", p: "C$ 450" },
        { id: 3, n: "Fritanga Doña Tania", t: "comida", i: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400", p: "C$ 120" },
        { id: 4, n: "Farmacia Value", t: "farma", i: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400", p: "C$ 300" }
    ],

    init() {
        const data = this.store.get();
        if(data.user) {
            document.getElementById('user-display').innerText = `¡Hola, ${data.user}!`;
            document.getElementById('status-tag').innerText = data.registered ? "Socio Vendedor" : "Cliente Pro";
            document.getElementById('prof-name').innerText = data.user;
            document.getElementById('prof-role').innerText = data.registered ? "Gestión de Negocio" : "Usuario Estándar";
        }

        setTimeout(() => document.getElementById('splash').style.display = 'none', 2000);
        this.renderStores(this.db);
        this.renderOrders();
    },

    renderStores(items) {
        const list = document.getElementById('store-list');
        list.innerHTML = items.map(s => `
            <div class="store-item" onclick="App.createOrder('${s.n}', '${s.p}')" style="display:flex; background:white; margin-bottom:12px; border-radius:15px; overflow:hidden; box-shadow:0 2px 5px rgba(0,0,0,0.05)">
                <img src="${s.i}" style="width:100px; height:100px; object-fit:cover;">
                <div style="padding:15px;">
                    <b style="font-size:1rem;">${s.n}</b><br>
                    <small style="color:#888;">Nicaragua Delivery</small><br>
                    <b style="color:var(--p);">${s.p}</b>
                </div>
            </div>
        `).join('');
    },

    toggleView(viewId) {
        document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
        // Lógica simple de activación de botones de navegación
    },

    createOrder(name, price) {
        const data = this.store.get();
        const newOrder = { id: Date.now(), name, price, status: 'En preparación 🍳' };
        data.orders.push(newOrder);
        this.store.save(data);
        alert(`Pedido confirmado en ${name}. ¡Revisa la pestaña de Pedidos!`);
        this.renderOrders();
    },

    renderOrders() {
        const data = this.store.get();
        const container = document.getElementById('active-orders');
        if(data.orders.length === 0) {
            container.innerHTML = "<p style='text-align:center; color:#999;'>No tienes pedidos activos.</p>";
            return;
        }
        container.innerHTML = data.orders.map(o => `
            <div class="order-card">
                <div style="display:flex; justify-content:space-between;">
                    <b>#${o.id.toString().slice(-5)}</b>
                    <span class="order-status">${o.status}</span>
                </div>
                <h4 style="margin:10px 0;">${o.name}</h4>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>Total: <b>${o.price}</b></span>
                    <button style="border:none; background:#f1f3f5; padding:5px 10px; border-radius:5px;">Ver Mapa 📍</button>
                </div>
            </div>
        `).join('');
    },

    showReg() { document.getElementById('reg-modal').style.display = 'flex'; },
    closeReg() { document.getElementById('reg-modal').style.display = 'none'; },

    processReg() {
        const name = document.getElementById('reg-name').value;
        const biz = document.getElementById('reg-biz').value;
        if(!name || !biz) return alert("Completa los datos");

        const data = this.store.get();
        data.user = name;
        data.registered = true;
        this.store.save(data);
        location.reload();
    }
};

window.onload = () => App.init();    
