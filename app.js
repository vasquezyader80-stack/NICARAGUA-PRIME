const App = {
    // Base de datos expandida (Más productos nacionales)
    data: {
        cart: [],
        shops: [
            { id: 1, n: "Tip-Top Managua", t: "comida", i: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=400", p: "Combo Clásico", price: 210 },
            { id: 2, n: "Quesillos La Paz Centro", t: "comida", i: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400", p: "Quesillo de Trenza", price: 85 },
            { id: 3, n: "Pulpería El Shaddai", t: "super", i: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400", p: "Litro de Leche", price: 36 },
            { id: 4, n: "Artesanías Masaya", t: "artesania", i: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=400", p: "Hamaca de Hilo", price: 1200 },
            { id: 5, n: "Café de Jinotega", t: "comida", i: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400", p: "Café Molido 1lb", price: 135 },
            { id: 6, n: "Super Express", t: "super", i: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400", p: "Pan Molde", price: 65 }
        ]
    },

    init() {
        // Splash rápido
        setTimeout(() => document.getElementById('splash').style.display='none', 1500);
        this.render(this.data.shops);
    },

    render(items) {
        const grid = document.getElementById('grid');
        grid.innerHTML = items.map(s => `
            <div class="card" onclick="App.addToCart('${s.p}', ${s.price})">
                <img src="${s.i}">
                <div class="info">
                    <h4>${s.n}</h4>
                    <p>${s.p}</p>
                    <span class="price">C$ ${s.price}</span>
                </div>
            </div>
        `).join('');
    },

    addToCart(name, price) {
        this.data.cart.push({name, price});
        document.getElementById('badge').innerText = this.data.cart.length;
        alert("Agregado: " + name);
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
            return `<p>${i.name} - <b>C$ ${i.price}</b></p>`;
        }).join('') || "Vacio";
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
            p += 1;
            f.style.width = p + "%";
            if(p >= 100) {
                clearInterval(int);
                alert("¡Tu pedido llegó! Gracias por usar Pinol app de Yader Vasquez.");
                t.style.display = 'none';
            }
        }, 100);
    },

    toggleReg() {
        const d = document.getElementById('reg-drawer');
        d.classList.toggle('open');
    },

    saveReg() {
        const biz = document.getElementById('r-biz').value;
        if(!biz) return alert("Pon el nombre de tu negocio");
        alert("✅ " + biz + " ha sido enviado a Yader Vasquez para aprobación.");
        this.toggleReg();
    },

    filter(t) {
        const f = (t === 'todos') ? this.data.shops : this.data.shops.filter(x => x.t === t);
        this.render(f);
    },

    search() {
        const q = document.getElementById('search').value.toLowerCase();
        const f = this.data.shops.filter(x => x.n.toLowerCase().includes(q) || x.p.toLowerCase().includes(q));
        this.render(f);
    }
};

window.onload = () => App.init();
