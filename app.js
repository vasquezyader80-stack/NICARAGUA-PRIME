const App = {
    // 1. DATA PERSISTENTE (LOCALSTORAGE)
    db: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_v11')) || {
            user: "Yader",
            cacaos: 500, // Saldo inicial de cortesía
            orders: [],
            inventory: [
                { id: 101, n: "Gallo Pinto c/ Carne", p: 150, c: "fritanga", i: "🥘", m: "Doña Tania" },
                { id: 102, n: "Toña 12oz Pack", p: 240, c: "bebidas", i: "🍺", m: "Cervecera" },
                { id: 103, n: "Queso Chontaleño", p: 95, c: "super", i: "🧀", m: "Lácteos" }
            ]
        },
        save: (data) => localStorage.setItem('PinolApp_v11', JSON.stringify(data))
    },

    init() {
        const data = this.db.get();
        document.getElementById('user-cacaos').innerText = data.cacaos;
        document.getElementById('p-name').innerText = data.user;
        
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 1500);

        this.renderGrid(data.inventory);
    },

    // 2. MARKETPLACE & FILTROS
    renderGrid(items) {
        const grid = document.getElementById('grid');
        grid.innerHTML = items.map(p => `
            <div class="p-card" onclick="App.openCheckout('${p.n}', ${p.p})">
                <div class="p-img">${p.i}</div>
                <b>${p.n}</b><br>
                <small>${p.m}</small><br>
                <span style="color:var(--blue); font-weight:800">C$ ${p.p}</span>
            </div>
        `).join('');
    },

    filter(cat, el) {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        el.classList.add('active');
        const data = this.db.get();
        const filtered = cat === 'all' ? data.inventory : data.inventory.filter(p => p.c === cat);
        this.renderGrid(filtered);
    },

    // 3. PROCESO DE PEDIDO Y RASTREO (TIEMPO REAL)
    openCheckout(name, price) {
        this.tempOrder = { name, price };
        document.getElementById('order-summary').innerHTML = `
            <div style="display:flex; justify-content:space-between; padding: 10px 0">
                <span>${name}</span>
                <b>C$ ${price}</b>
            </div>
        `;
        document.getElementById('modal-checkout').classList.add('active');
    },
  
    processOrder() {
        let data = this.db.get();
        const cost = this.tempOrder.price;
        
        // Descontar saldo de Cacaos (simulación de pago)
        data.cacaos -= 5; // Gana puntos por compra o gasta
        const newOrder = {
            id: Math.floor(1000 + Math.random() * 9000),
            name: this.tempOrder.name,
            status: "Iniciando..."
        };
        data.orders.unshift(newOrder);
        this.db.save(data);

        this.closeModal();
        this.navigate('orders', document.querySelectorAll('.d-item')[1]);
        this.startLiveTracking(newOrder.id);
    },

    startLiveTracking(orderId) {
        const container = document.getElementById('live-tracking');
        container.innerHTML = `
            <div class="tracking-content">
                <b>Orden #${orderId}</b>
                <p id="track-status">Confirmando con el restaurante...</p>
                <div class="progress-container">
                    <div id="p-bar" class="progress-bar"></div>
                </div>
                <small id="track-step">Paso 1 de 4</small>
            </div>
        `;

        let progress = 0;
        const steps = ["Confirmado ✔️", "En Cocina 👨‍🍳", "Motorizado en camino 🛵", "¡Ya llegó! 🏠"];
        
        const interval = setInterval(() => {
            progress += 25;
            document.getElementById('p-bar').style.width = progress + "%";
            const stepIdx = (progress / 25) - 1;
            document.getElementById('track-status').innerText = steps[stepIdx];
            document.getElementById('track-step').innerText = `Paso ${stepIdx + 1} de 4`;

            if(progress >= 100) {
                clearInterval(interval);
                alert("¡Tu pedido ha llegado!");
            }
        }, 3000); // Cambia cada 3 segundos para la demo
    },

    // 4. UTILIDADES
    navigate(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        document.querySelectorAll('.d-item').forEach(d => d.classList.remove('active'));
        if(el) el.classList.add('active');
    },

    closeModal() {
        document.getElementById('modal-checkout').classList.remove('active');
    },

    toggleBusinessPanel() {
        const name = prompt("Nombre de tu Negocio para el Panel:");
        if(name) alert(`Bienvenido al Panel de Socio de ${name}. Aquí verás tus ventas del día.`);
    }
};

window.onload = () => App.init();
