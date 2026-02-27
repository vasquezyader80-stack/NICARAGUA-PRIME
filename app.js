const App = {
    // 1. NÚCLEO DE DATOS (Check ✅)
    data: {
        get: () => JSON.parse(localStorage.getItem('Pinol_Master_v4')) || { user: 'Invitado', socio: false, orders: [], biz: '' },
        save: (d) => localStorage.setItem('Pinol_Master_v4', JSON.stringify(d))
    },

    // 2. CATÁLOGO DE COMERCIOS
    stores: [
        { id: 1, n: "Tip-Top Los Robles", c: "comida", i: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=600", fee: 35 },
        { id: 2, n: "Súper La Unión", c: "super", i: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600", fee: 55 },
        { id: 3, n: "Fritanga El Madroño", c: "comida", i: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600", fee: 25 },
        { id: 4, n: "Farmacia Médica", c: "farma", i: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=600", fee: 40 }
    ],

    init() {
        const session = this.data.get();
        this.syncUI(session);

        // Simulación de carga de red
        setTimeout(() => {
            document.getElementById('splash-status').innerText = "CONEXIÓN ESTABLECIDA...";
            setTimeout(() => {
                document.getElementById('splash').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('splash').style.display = 'none';
                    document.getElementById('app').style.display = 'block';
                }, 500);
            }, 1000);
        }, 1500);

        this.renderStores(this.stores);
        this.renderOrders();
    },

    // 3. NAVEGACIÓN ACTIVA
    navigate(id, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${id}`).classList.add('active');
        if(btn) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            btn.classList.add('active');
        }
    },

    // 4. LÓGICA DE NEGOCIO (DESPIERTA)
    renderStores(items) {
        const grid = document.getElementById('store-grid');
        grid.innerHTML = items.map(s => `
            <div class="card" onclick="App.createOrder('${s.n}', ${s.fee})">
                <img src="${s.i}">
                <div class="card-body">
                    <div style="display:flex; justify-content:space-between">
                        <b>${s.n}</b>
                        <span style="color:green; font-weight:800">C$ ${s.fee}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    createOrder(store, fee) {
        const session = this.data.get();
        const orderId = Math.floor(10000 + Math.random() * 90000);
        const newOrder = { id: orderId, name: store, status: 'Confirmando...', time: '25 min' };
        
        session.orders.unshift(newOrder);
        this.data.save(session);
        
        this.renderOrders();
        this.navigate('orders');
        
        // Simulación de respuesta de restaurante
        setTimeout(() => {
            const current = this.data.get();
            current.orders[0].status = "En camino 🛵";
            this.data.save(current);
            this.renderOrders();
        }, 4000);    
    },

    renderOrders() {
        const container = document.getElementById('live-orders');
        const session = this.data.get();
        if(session.orders.length === 0) {
            container.innerHTML = `<p style="text-align:center; padding:50px; color:#888;">No tienes pedidos hoy.</p>`;
            return;
        }
        container.innerHTML = session.orders.map(o => `
            <div class="card" style="margin-bottom:15px; border-left: 6px solid var(--p);">
                <div class="card-body">
                    <div style="display:flex; justify-content:space-between">
                        <b style="color:var(--s)">ORDEN #${o.id}</b>
                        <span style="color:orange; font-weight:900;">${o.status}</span>
                    </div>
                    <p style="margin:10px 0;">Origen: ${o.name}</p>
                    <div style="display:flex; gap:10px;">
                        <button class="chip active" style="padding:5px 10px">Mapa 📍</button>
                        <button class="chip" onclick="alert('Conectando con motorizado...')">Chat 💬</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // 5. MÓDULO DE SOCIO
    modal(id, open = true) {
        document.getElementById(`modal-${id}`).style.display = open ? 'flex' : 'none';
    },

    beSocio() {
        const name = document.getElementById('biz-owner').value;
        const biz = document.getElementById('biz-name').value;
        if(!name || !biz) return alert("Error: Datos incompletos para activación.");

        const session = this.data.get();
        session.user = name;
        session.biz = biz;
        session.socio = true;
        this.data.save(session);

        alert("¡Nivel de Socio Activado! Reiniciando terminal...");
        location.reload();
    },

    syncUI(s) {
        document.getElementById('user-welcome').innerText = `¡Hola, ${s.user}!`;
        document.getElementById('role-tag').innerText = s.socio ? 'SOCIO VENDEDOR' : 'VISITANTE';
        document.getElementById('prof-name').innerText = s.user;
        document.getElementById('prof-type').innerText = s.socio ? `Empresa: ${s.biz}` : 'Usuario Estándar';
    },

    clearData() {
        if(confirm("¿Borrar todos los datos de esta terminal?")) {
            localStorage.clear();
            location.reload();
        }
    }
};

window.onload = () => App.init();
