const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_Cloud_System')) || {
        cart: [],
        shops: [
            { id: 101, name: "Pulpería La Bendición", type: "super", img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400", items: [{n: "Litro Leche Parmalat", p: 36}, {n: "Libra de Arroz", p: 20}] },
            { id: 102, name: "Asados El Shaddai", type: "comida", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400", items: [{n: "Servicio Cerdo", p: 160}, {n: "Cacao con Leche", p: 45}] },
            { id: 103, name: "Farmacia Económica", type: "farmacia", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400", items: [{n: "Acetaminofén", p: 15}, {n: "Suero Oral", p: 25}] }
        ]
    },

    init() {
        setTimeout(() => document.getElementById('splash').style.opacity = '0', 2000);
        setTimeout(() => document.getElementById('splash').style.display = 'none', 2500);
        this.renderShops();
        this.updateBadge();
    },

    // --- Navegación de Vistas ---
    renderShops(data = this.state.shops) {
        const list = document.getElementById('shop-list');
        list.innerHTML = data.map(s => `
            <div class="shop-card" onclick="PinolApp.openMenu(${s.id})">
                <img src="${s.img}">
                <div class="shop-info">
                    <h4>${s.name}</h4>
                    <p style="font-size:0.7rem; color:#888;">🛵 Envío C$ 35 • 20 min</p>
                </div>
            </div>
        `).join('');
    },

    openMenu(id) {
        const shop = this.state.shops.find(x => x.id === id);
        document.getElementById('shop-view').style.display = 'none';
        document.getElementById('menu-view').style.display = 'block';
        document.getElementById('shop-title-display').innerText = shop.name;
        
        const grid = document.getElementById('product-list');
        grid.innerHTML = shop.items.map(i => `
            <div style="background:#fff; padding:15px; border-radius:15px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <div><b>${i.n}</b><br><small>C$ ${i.p}</small></div>
                <button onclick="PinolApp.addToCart('${i.n}', ${i.p})" style="background:var(--blue); color:#fff; border:none; padding:8px 15px; border-radius:10px;">+</button>
            </div>
        `).join('');
    },

    closeMenu() {
        document.getElementById('shop-view').style.display = 'block';
        document.getElementById('menu-view').style.display = 'none';
    },

    // --- Carrito y Pedidos ---
    addToCart(name, price) {
        this.state.cart.push({name, price});
        this.updateBadge();
    },

    updateBadge() {
        document.getElementById('cart-badge').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_Cloud_System', JSON.stringify(this.state));
    },

    toggleCart() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
        this.renderCartItems();
    },

    renderCartItems() {
        const list = document.getElementById('cart-items-list');
        let total = 0;
        list.innerHTML = this.state.cart.map(i => {
            total += i.price;
            return `<div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;"><span>${i.name}</span><b>C$ ${i.price}</b></div>`;
        }).join('') || '<p style="text-align:center; padding:20px;">No has agregado nada aún.</p>';
        document.getElementById('cart-total-val').innerText = total;
    },

    placeOrder() {
        if(!this.state.cart.length) return;
        this.toggleCart();
        this.startTracking();
        this.state.cart = [];
        this.updateBadge();
    },

    // --- Algoritmo de Rastreo Profesional ---
    startTracking() {
        const tracker = document.getElementById('delivery-tracker');
        const fill = document.getElementById('progress-fill');
        const timer = document.getElementById('eta-timer');
        tracker.style.display = 'block';
        
        let timeLeft = 15; // 15 minutos simulados
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += 1;
            timeLeft = Math.max(0, 15 - Math.floor(progress / 6.6)); // Simulación de tiempo
            fill.style.width = `${progress}%`;
            timer.innerText = `${timeLeft} min`;
            
            if(progress >= 100) {
                clearInterval(interval);
                alert("🔔 ¡Tu repartidor de Pinol app ha llegado!");
                tracker.style.display = 'none';
            }
        }, 1000); // 1.6 minutos por segundo para la demo
    },

    // --- Panel de Registro ---
    openAuth() { document.getElementById('auth-drawer').classList.add('open'); },
    closeAuth() { document.getElementById('auth-drawer').classList.remove('open'); },
    
    processRegistration() {
        const role = document.getElementById('reg-role').value;
        const name = document.getElementById('reg-biz-name').value;
        const idCard = document.getElementById('reg-id').value;

        if(!name || !idCard) return alert("Por favor ingresa tu Cédula y nombre.");

        alert(`✅ ¡Registro Solicitado!\n\nHola ${role}, Yader Vasquez revisará tus datos (Cédula: ${idCard}) para activar tu cuenta en 24h.`);
        this.closeAuth();
    }
};

window.onload = () => PinolApp.init();
