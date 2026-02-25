const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_Core_Data')) || {
        cart: [],
        shops: [
            { id: 1, name: "Pulpería La Bendición", type: "super", img: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500", items: [{n: "Litro Leche Parmalat", p: 36}, {n: "Libra Arroz Faisán", p: 20}] },
            { id: 2, name: "Asados El Shaddai", type: "comida", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500", items: [{n: "Servicio de Cerdo", p: 160}, {n: "Cacao Tradicional", p: 45}] },
            { id: 3, name: "Farmacia Económica", type: "farmacia", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=500", items: [{n: "Suero Oral", p: 25}, {n: "Acetaminofén", p: 10}] }
        ]
    },

    init() {
        setTimeout(() => document.getElementById('splash').style.display = 'none', 2500);
        this.renderShops();
        this.updateBadge();
    },

    renderShops(data = this.state.shops) {
        const grid = document.getElementById('shop-grid');
        grid.innerHTML = data.map(s => `
            <div class="shop-card" onclick="PinolApp.openMenu(${s.id})">
                <img src="${s.img}">
                <div class="shop-info">
                    <h4>${s.name}</h4>
                    <p style="font-size:0.7rem; color:#888;">🛵 C$ 35 • 15-25 min</p>
                </div>
            </div>
        `).join('');
    },

    openMenu(id) {
        const shop = this.state.shops.find(x => x.id === id);
        document.getElementById('shop-view').style.display = 'none';
        document.getElementById('menu-view').style.display = 'block';
        document.getElementById('shop-header').innerHTML = `<h2>${shop.name}</h2><p>Menú del establecimiento</p>`;
        
        const list = document.getElementById('product-list');
        list.innerHTML = shop.items.map(i => `
            <div style="background:#fff; padding:15px; border-radius:15px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border:1px solid #eee;">
                <div><b>${i.n}</b><br><small>C$ ${i.p}</small></div>
                <button onclick="PinolApp.addToCart('${i.n}', ${i.p})" style="background:var(--red); color:#fff; border:none; padding:8px 15px; border-radius:10px; font-weight:800;">+</button>
            </div>
        `).join('');
    },

    closeMenu() {
        document.getElementById('shop-view').style.display = 'block';
        document.getElementById('menu-view').style.display = 'none';
    },

    addToCart(name, price) {
        this.state.cart.push({name, price});
        this.updateBadge();
    },

    updateBadge() {
        document.getElementById('cart-badge').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_Core_Data', JSON.stringify(this.state));
    },

    toggleCart() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
        this.renderCartItems();
    },

    renderCartItems() {
        const list = document.getElementById('cart-items-box');
        let total = 0;
        list.innerHTML = this.state.cart.map(i => {
            total += i.price;
            return `<div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #eee;"><span>${i.name}</span><b>C$ ${i.price}</b></div>`;
        }).join('') || '<p style="text-align:center; padding:30px; color:#888;">Tu carrito está vacío</p>';
        document.getElementById('cart-total-val').innerText = total;
    },

    placeOrder() {
        if(!this.state.cart.length) return;
        this.toggleCart();
        this.state.cart = [];
        this.updateBadge();
        this.startTracking();
    },

    // Algoritmo de Seguimiento Basado en Distancia
    startTracking() {
        const widget = document.getElementById('tracking-widget');
        const line = document.getElementById('progress-line');
        const timer = document.getElementById('eta-display');
        const msg = document.getElementById('track-msg');
        
        widget.style.display = 'block';
        let progress = 0;
        let time = 15;

        const interval = setInterval(() => {
            progress += 1;
            line.style.width = `${progress}%`;
            
            if(progress === 30) msg.innerText = "¡El motorizado ha recogido tu pedido!";
            if(progress === 70) msg.innerText = "¡Tu pedido está muy cerca!";
            
            if(progress % 7 === 0 && time > 1) {
                time--;
                timer.innerText = `${time} min`;
            }

            if(progress >= 100) {
                clearInterval(interval);
                msg.innerText = "¡El pedido ha llegado a tu ubicación!";
                timer.innerText = "LLEGÓ";
                alert("🇳🇮 ¡Pedido de Pinol app en tu puerta!\n\nPaga en efectivo al repartidor.");
            }
        }, 800);
    },

    // Registro Lateral
    openAuth() { document.getElementById('auth-drawer').classList.add('open'); },
    closeAuth() { document.getElementById('auth-drawer').classList.remove('open'); },
    
    processRegistration() {
        const role = document.getElementById('reg-role').value;
        const cedula = document.getElementById('reg-id').value;
        const biz = document.getElementById('reg-biz').value;

        if(!cedula || !biz) return alert("Por favor, completa todos los campos para la validación.");

        alert(`✅ ¡Datos Recibidos!\n\n${role}: ${biz}\nCédula: ${cedula}\n\nYader Vasquez revisará tu solicitud para activar tu perfil en el sistema.`);
        this.closeAuth();
    }
};

window.onload = () => PinolApp.init();
