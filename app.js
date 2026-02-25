const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_Master_DB')) || {
        cart: [],
        shops: [
            { id: 1, name: "Tip Top - Managua", type: "comida", img: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=500", items: [{n: "Combo Gigante", p: 250}, {n: "Pechuguitas", p: 140}] },
            { id: 2, name: "Super Express", type: "super", img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500", items: [{n: "Leche Parmalat 1L", p: 35}, {n: "Pan Bimbo", p: 65}] },
            { id: 3, name: "Artesanías Masaya", type: "artesania", img: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=500", items: [{n: "Hamaca Matrimonial", p: 1500}, {n: "Jarrón Decorado", p: 400}] },
            { id: 4, name: "Café de Jinotega", type: "comida", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500", items: [{n: "Bolsa 1lb Molido", p: 130}] },
            { id: 5, name: "Farmacia Value", type: "salud", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=500", items: [{n: "Kit de Vitaminas", p: 300}] },
            { id: 6, name: "Quesillos La Paz Centro", type: "comida", img: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=500", items: [{n: "Quesillo Trenza", p: 85}] }
        ]
    },

    init() {
        setTimeout(() => document.getElementById('splash').style.display = 'none', 2500);
        this.renderShops();
        this.updateBadge();
    },

    renderShops(items = this.state.shops) {
        const grid = document.getElementById('shop-grid');
        grid.innerHTML = items.map(s => `
            <div class="shop-card" onclick="PinolApp.openShop(${s.id})">
                <img src="${s.img}">
                <div class="shop-info">
                    <h4>${s.name}</h4>
                    <p style="font-size:0.65rem; color:#888;">🛵 C$ 35 • Nicaragua</p>
                </div>
            </div>
        `).join('');
    },

    openShop(id) {
        const shop = this.state.shops.find(x => x.id === id);
        alert(`🛒 ¡Bienvenido a ${shop.name}!\n\nHas seleccionado productos de este local. Añadiendo al carrito automáticamente.`);
        this.state.cart.push(shop.items[0]);
        this.updateBadge();
    },

    updateBadge() {
        document.getElementById('badge-count').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_Master_DB', JSON.stringify(this.state));
    },

    filter(cat) {
        const filtered = cat === 'todos' ? this.state.shops : this.state.shops.filter(s => s.type === cat);
        this.renderShops(filtered);
    },

    search() {
        const query = document.getElementById('main-search').value.toLowerCase();
        const filtered = this.state.shops.filter(s => s.name.toLowerCase().includes(query));
        this.renderShops(filtered);
    },

    toggleCart() {
        const m = document.getElementById('cart-panel');
        m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
        this.renderCartItems();
    },

    renderCartItems() {
        const list = document.getElementById('cart-items-list');
        let total = 0;
        list.innerHTML = this.state.cart.map(i => {
            total += i.p;
            return `<div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;"><span>${i.n}</span><b>C$ ${i.p}</b></div>`;
        }).join('') || '<p style="text-align:center; padding:30px;">Tu pedido está vacío</p>';
    },

    confirmOrder() {
        if(this.state.cart.length === 0) return;
        this.toggleCart();
        this.startTracking();
        this.state.cart = [];
        this.updateBadge();
    },

    startTracking() {
        const widget = document.getElementById('global-tracker');
        const fill = document.getElementById('progress-line');
        const timer = document.getElementById('eta-timer');
        
        widget.style.display = 'block';
        let progress = 0;
        let minutes = 15;

        const interval = setInterval(() => {
            progress += 1;
            fill.style.width = `${progress}%`;
            
            if(progress % 6 === 0) {
                minutes--;
                timer.innerText = `${minutes}:00 min`;
            }

            if(progress >= 100) {
                clearInterval(interval);
                alert("🇳🇮 ¡Pedido en tu puerta!\n\nGracias por confiar en Pinol app de Yader Vasquez.");
                widget.style.display = 'none';
            }
        }, 800);
    },

    openAuth() { document.getElementById('auth-drawer').classList.add('open'); },
    closeAuth() { document.getElementById('auth-drawer').classList.remove('open'); },

    processReg() {
        const name = document.getElementById('reg-name').value;
        const cedula = document.getElementById('reg-id').value;
        const biz = document.getElementById('reg-biz').value;

        if(!name || !cedula) return alert("Completa los datos para la validación de Yader Vasquez.");
        
        alert(`✅ ¡Registro Recibido!\n\nNegocio: ${biz}\nID: ${cedula}\n\nRevisaremos tu solicitud para activarte.`);
        this.closeAuth();
    }
};

window.onload = () => PinolApp.init();
