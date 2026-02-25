const App = {
    data: {
        cart: [],
        shops: [
            { id: 1, n: "Tip-Top Managua", t: "comida", i: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=400", p: "Combo Familiar", price: 350 },
            { id: 2, n: "Quesillos León", t: "comida", i: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400", p: "Quesillo Doble", price: 95 },
            { id: 3, n: "Artesanías Masaya", t: "artesania", i: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=400", p: "Hamaca Fina", price: 1500 },
            { id: 4, n: "Súper Express", t: "super", i: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400", p: "Aceite 1L", price: 75 },
            { id: 5, n: "Farmacia Nicaragua", t: "salud", i: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400", p: "Vitaminas", price: 200 }
        ]
    },

    init() {
        setTimeout(() => document.getElementById('splash').style.display='none', 1200);
        this.render(this.data.shops);
    },

    render(items) {
        const grid = document.getElementById('grid');
        grid.innerHTML = items.map(s => `
            <div class="card" onclick="App.add('${s.p}', ${s.price})">
                <img src="${s.i}">
                <div class="info">
                    <h4>${s.n}</h4>
                    <p>${s.p}</p>
                    <span class="price">C$ ${s.price}</span>
                </div>
            </div>
        `).join('');
    },

    add(name, price) {
        this.data.cart.push({name, price});
        document.getElementById('badge').innerText = this.data.cart.length;
        // Pequeña notificación visual rápida
    },

    toggleReg() {
        document.getElementById('reg-drawer').classList.toggle('active');
    },

    toggleCart() {
        const m = document.getElementById('cart-modal');
        m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
        this.renderCart();
    },

    renderCart() {
        const list = document.getElementById('cart-list');
        let total = 0;
        list.innerHTML = this.data.cart.map(i => {
            total += i.price;
            return `<p>✅ ${i.name} - <b>C$ ${i.price}</b></p>`;
        }).join('') || "No hay productos.";
        document.getElementById('total').innerText = total;
    },

    buy() {
        if(this.data.cart.length === 0) return;
        this.toggleCart();
        this.startTracker();
        this.data.cart = [];
        document.getElementById('badge').innerText = "0";
    },

    startTracker() {
        const t = document.getElementById('tracker');
        const f = document.getElementById('fill');
        t.style.display = 'block';
        let p = 0;
        const int = setInterval(() => {
            p += 2;
            f.style.width = p + "%";
            if(p >= 100) {
                clearInterval(int);
                alert("¡Pedido Entregado! Pinol app de Yader Vasquez.");
                t.style.display = 'none';
            }
        }, 150);
    },

    search() {
        const q = document.getElementById('search').value.toLowerCase();
        const f = this.data.shops.filter(x => x.n.toLowerCase().includes(q) || x.p.toLowerCase().includes(q));
        this.render(f);
    },

    filter(type) {
        const f = (type === 'todos') ? this.data.shops : this.data.shops.filter(x => x.t === type);
        this.render(f);
    },

    saveReg() {
        const biz = document.getElementById('r-biz').value;
        if(!biz) return alert("Ingresa el nombre de tu negocio");
        alert("Enviado a Yader Vasquez. Tu negocio aparecerá pronto.");
        this.toggleReg();
    }
};

window.onload = () => App.init();
