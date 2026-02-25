const App = {
    // Sistema de Datos con LocalStorage (Recuerda nombre y Cacaos)
    storage: {
        get: () => JSON.parse(localStorage.getItem('PinolAppData')) || { name: 'Usuario', cacaos: 100, cart: [], registeredBiz: [] },
        save: (data) => localStorage.setItem('PinolAppData', JSON.stringify(data))
    },

    // Base de Datos Nacional (Simulada para mayoristas y minoristas)
    db: [
        { id: 1, n: "Tip-Top Central", t: "comida", i: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=400", p: "Combo Familiar", price: 380 },
        { id: 2, n: "Quesillos Mi Terruño", t: "comida", i: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400", p: "Quesillo Especial", price: 90 },
        { id: 3, n: "Súper La Colonia", t: "super", i: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400", p: "Aceite 1L", price: 78 },
        { id: 4, n: "Artesanías Masaya", t: "artesania", i: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=400", p: "Hamaca Matrimonial", price: 1450 },
        { id: 5, n: "Café Presto 500g", t: "super", i: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400", p: "Café Instantáneo", price: 160 }
    ],

    init() {
        const data = this.storage.get();
        document.getElementById('display-name').innerText = data.name;
        document.getElementById('cacaos-val').innerText = data.cacaos;
        
        setTimeout(() => document.getElementById('splash').style.display = 'none', 1500);
        this.render(this.db);
    },

    render(items) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = items.map(s => `
            <div class="card" onclick="App.addToCart('${s.p}', ${s.price})">
                <img src="${s.i}" loading="lazy">
                <div class="card-body">
                    <h4>${s.n}</h4>
                    <p style="font-size:0.7rem; color:#666; margin:4px 0;">${s.p}</p>
                    <span class="price-tag">C$ ${s.price}</span>
                </div>
            </div>
        `).join('');
    },

    addToCart(name, price) {
        const data = this.storage.get();
        data.cart.push({name, price});
        this.storage.save(data);
        document.getElementById('cart-count').innerText = data.cart.length;
        alert(`✅ ${name} agregado.`);
    },

    saveUser() {
        const name = document.getElementById('reg-name').value;
        const biz = document.getElementById('reg-biz').value;
        if(!name) return alert("Por favor, ingresa tu nombre.");
        
        const data = this.storage.get();
        data.name = name;
        if(biz) data.registeredBiz.push(biz);
        this.storage.save(data);
        
        document.getElementById('display-name').innerText = name;
        alert("¡Datos guardados por Yader Vasquez!");
        this.toggleDrawer();
    },

    toggleDrawer() {
        document.getElementById('side-drawer').classList.toggle('open');
    },

    toggleCart() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
        this.renderCart();
    },

    renderCart() {
        const data = this.storage.get();
        const list = document.getElementById('cart-list');
        let total = 0;
        list.innerHTML = data.cart.map(i => {
            total += i.price;
            return `<div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;"><span>${i.name}</span><b>C$ ${i.price}</b></div>`;
        }).join('') || "Tu carrito está vacío.";
        document.getElementById('cart-total').innerText = total;
    },

    checkout() {
        const data = this.storage.get();
        if(data.cart.length === 0) return;
        
        data.cacaos += 10; // Gana 10 cacaos por compra
        data.cart = [];
        this.storage.save(data);
        
        this.toggleCart();
        document.getElementById('cacaos-val').innerText = data.cacaos;
        document.getElementById('cart-count').innerText = "0";
        this.startTracker();
    },

    startTracker() {
        const t = document.getElementById('tracker');
        const f = document.getElementById('t-fill');
        t.style.display = 'block';
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            f.style.width = p + "%";
            if(p >= 100) {
                clearInterval(interval);
                alert("🔔 ¡Llegó tu pedido! Gracias por usar Pinol app.");
                t.style.display = 'none';
            }
        }, 500);
    },

    filter(type) {
        const filtered = (type === 'todos') ? this.db : this.db.filter(x => x.t === type);
        this.render(filtered);
    },

    search() {
        const q = document.getElementById('search-input').value.toLowerCase();
        const filtered = this.db.filter(x => x.n.toLowerCase().includes(q) || x.p.toLowerCase().includes(q));
        this.render(filtered);
    }
};

window.onload = () => App.init();
