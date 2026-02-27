const App = {
    // 1. BASE DE DATOS LOCAL (Persistencia de Yader)
    state: {
        dbName: 'PinolApp_Enterprise_v1',
        get: () => JSON.parse(localStorage.getItem(App.state.dbName)) || { 
            user: "Invitado", 
            isSocio: false, 
            orders: [], 
            bizName: "" 
        },
        save: (data) => localStorage.setItem(App.state.dbName, JSON.stringify(data))
    },

    // 2. INVENTARIO COMERCIAL
    inventory: [
        { id: 101, name: "Tip-Top Los Robles", cat: "comida", img: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=600", fee: 40 },
        { id: 102, name: "La Colonia Altamira", cat: "super", img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600", fee: 60 },
        { id: 103, name: "Fritanga Doña Tania", cat: "comida", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600", fee: 35 },
        { id: 104, name: "Oriental Online", cat: "super", img: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=600", fee: 85 }
    ],

    init() {
        // Cargar Datos Guardados
        const session = this.state.get();
        this.updateProfileUI(session);

        // Despertar la App tras el Splash
        setTimeout(() => {
            document.getElementById('splash').style.transform = 'scale(1.1)';
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app-core').style.display = 'block';
            }, 600);
        }, 2200);

        this.renderStores(this.inventory);
        this.renderOrders();
    },

    // 3. SISTEMA DE NAVEGACIÓN ACTIVA
    navigate(viewId, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');

        document.querySelectorAll('.dock-link').forEach(l => l.classList.remove('active'));
        if(btn) btn.classList.add('active');
    },

    // 4. MOTOR DE RENDERIZADO
    renderStores(data) {
        const grid = document.getElementById('store-grid');
        grid.innerHTML = data.map(s => `
            <div class="card-store" onclick="App.placeOrder('${s.name}', ${s.fee})">
                <img src="${s.img}" alt="${s.name}">
                <div class="card-content">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <b>${s.name}</b>
                        <span style="color:green; font-weight:800; font-size:12px;">C$ ${s.fee} Envío</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // 5. SISTEMA DE PEDIDOS (DESPIERTO ✅)
    placeOrder(storeName, fee) {
        const data = this.state.get();
        const orderId = Math.floor(1000 + Math.random() * 9000);
        const newOrder = { 
            id: orderId, 
            store: storeName, 
            status: "Confirmando...", 
            time: "25-30 min" 
        };

        data.orders.unshift(newOrder);
        this.state.save(data);
        this.renderOrders();
        this.navigate('orders');
        
        // Simulación de respuesta de servidor
        setTimeout(() => {
            const current = this.state.get();
            current.orders[0].status = "En preparación 👨‍🍳";
            this.state.save(current);
            this.renderOrders();
        }, 3000);
    },

    renderOrders() {
        const container = document.getElementById('active-orders-container');
        const data = this.state.get();
        if(data.orders.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:40px; color:#94a3b8;">No tienes pedidos activos hoy.</div>`;
            return;
        }
        container.innerHTML = data.orders.map(o => `
            <div class="card-store" style="margin-bottom:12px; border-left: 5px solid var(--primary);">
                <div class="card-content">
                    <div style="display:flex; justify-content:space-between;">
                        <b>ORDEN #${o.id}</b>
                        <span style="color:var(--primary); font-weight:800;">${o.status}</span>
                    </div>
                    <p style="margin:5px 0;">Tienda: ${o.store}</p>
                    <small>Llega en: ${o.time}</small>
                </div>
            </div>
        `).join('');
    },

    // 6. SISTEMA DE SOCIOS (REGISTRO ✅)
    openAuth() { document.getElementById('auth-modal').style.display = 'flex'; },
    closeAuth() { document.getElementById('auth-modal').style.display = 'none'; },

    handleAuth() {
        const user = document.getElementById('reg-user').value;
        const biz = document.getElementById('reg-biz').value;
        if(!user || !biz) return alert("Por favor complete todos los campos de socio.");

        const data = this.state.get();
        data.user = user;
        data.bizName = biz;
        data.isSocio = true;
        this.state.save(data);
        
        alert("¡Solicitud enviada! Tu cuenta de Socio ha sido activada en este dispositivo.");
        this.closeAuth();
        location.reload();
    },

    updateProfileUI(session) {
        document.getElementById('display-name').innerText = session.user;
        if(session.isSocio) {
            document.getElementById('display-role').innerText = "SOCIO VENDEDOR";
            document.getElementById('display-role').style.background = "#005aab";
            document.getElementById('display-role').style.color = "white";
            document.getElementById('profile-title').innerText = `Panel de: ${session.bizName}`;
        }
    },

    resetAll() {
        if(confirm("¿Estás seguro de restablecer la App? Se borrarán tus datos de socio y pedidos.")) {
            localStorage.removeItem(this.state.dbName);
            location.reload();
        }
    }
};

window.onload = () => App.init();
              
