const App = {
    // ESTADO GLOBAL DE LA APP (Datos Persistentes de Yader)
    state: {
        get: () => JSON.parse(localStorage.getItem('PinolApp_v6')) || {
            user: "Yader",
            socio: false,
            orders: [],
            inventory: [] // Productos creados por los socios locales
        },
        save: (d) => localStorage.setItem('PinolApp_v6', JSON.stringify(d))
    },

    // CATÁLOGO BASE (EMPRESAS ANCLA)
    baseStores: [
        { id: 10, n: "Tip-Top Los Robles", p: 420, cat: "comida", s: "Famosos por el sabor" },
        { id: 11, n: "Fritanga La Sureña", p: 150, cat: "comida", s: "Carne asada al carbón" },
        { id: 12, n: "Súper Express", p: 90, cat: "super", s: "Canasta básica" }
    ],

    init() {
        const data = this.state.get();
        // Simular carga de red profesional
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.opacity = '1';
            }, 500);
        }, 2000);

        this.renderMarketplace();
        this.renderTracking();
    },

    // RENDERIZAR TIENDA (ENFOQUE CLIENTE)
    renderMarketplace() {
        const data = this.state.get();
        const grid = document.getElementById('store-grid');
        const allItems = [...data.inventory, ...this.baseStores];
        
        grid.innerHTML = allItems.map(i => `
            <div class="store-card-pro" onclick="App.openCheckout('${i.n}', ${i.p})">
                <div class="img-placeholder">🍲</div>
                <div class="card-details">
                    <b>${i.n}</b>
                    <small>${i.s || 'Comercio Afiliado'}</small><br><br>
                    <span>C$ ${i.p}</span>
                </div>
            </div>
        `).join('');
    },

    // SISTEMA DE CHECKOUT DESLIZABLE
    openCheckout(name, price) {
        const subtotal = price;
        const total = subtotal + 45 + 10;
        
        document.getElementById('cart-item-info').innerHTML = `
            <div style="display:flex; justify-content:space-between">
                <b>${name}</b>
                <b>C$ ${price}</b>
            </div>
        `;
        document.getElementById('s-sub').innerText = `C$ ${subtotal}`;
        document.getElementById('s-total').innerText = `C$ ${total}`;
        
        // Guardar pedido temporal
        this.tempOrder = { n: name, t: total };
        document.getElementById('checkout-modal').classList.add('active');
    },

    confirmPurchase() {
        const data = this.state.get();
        const newOrder = {
            id: Math.floor(Math.random() * 9999),
            name: this.tempOrder.n,
            status: "Buscando repartidor... 🛵",
            total: this.tempOrder.t
        };
        data.orders.unshift(newOrder);
        this.state.save(data);
        
        document.getElementById('checkout-modal').classList.remove('active');
        alert("¡Pedido enviado! Podés rastrearlo en la pestaña de pedidos.");
        this.renderTracking();
        this.navigate('orders');
    },  

    // RENDERIZAR RASTREO
    renderTracking() {
        const data = this.state.get();
        const container = document.getElementById('live-tracking');
        container.innerHTML = data.orders.map(o => `
            <div class="store-card-pro" style="margin-bottom:15px; border-left: 5px solid var(--blue)">
                <div class="card-details">
                    <div style="display:flex; justify-content:space-between">
                        <b>#${o.id} - ${o.name}</b>
                        <b style="color:var(--blue)">${o.status}</b>
                    </div>
                    <small>Total pagado: C$ ${o.total}</small>
                </div>
            </div>
        `).join('');
    },

    // SISTEMA PARA EL SOCIO (MÓDULO DE NEGOCIO)
    addSocioProduct() {
        const n = document.getElementById('p-name').value;
        const p = document.getElementById('p-price').value;
        if(!n || !p) return;

        const data = this.state.get();
        data.inventory.unshift({ id: Date.now(), n, p: parseInt(p), cat: 'socio', s: 'Producto Local' });
        this.state.save(data);
        
        alert("Producto publicado en el Marketplace.");
        this.renderMarketplace();
        this.renderSocioItems();
        // Limpiar campos
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
    },

    renderSocioItems() {
        const data = this.state.get();
        const cont = document.getElementById('socio-items');
        cont.innerHTML = data.inventory.map(i => `
            <div class="store-card-pro" style="margin-bottom:10px; padding:10px;">
                <b>${i.n} - C$ ${i.p}</b>
            </div>
        `).join('');
    },

    // NAVEGACIÓN SPA
    navigate(id, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${id}`).classList.add('active');
        if(btn) {
            document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
        }
        if(id === 'socio') this.renderSocioItems();
    }
};

window.onload = () => App.init();
