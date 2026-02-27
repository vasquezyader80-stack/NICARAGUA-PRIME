const App = {
    // 1. EL GRAN CATÁLOGO DE NICARAGUA (RED INTEGRADA)
    products: [
        { id: 1, n: "Cerveza Toña 12oz", p: 45, m: "Compañía Cervecera", c: "bebidas", i: "🍺", b: "Nacional" },
        { id: 2, n: "Ron Flor de Caña 7 Años", p: 480, m: "SER Licorera", c: "bebidas", i: "🍾", b: "Premium" },
        { id: 3, n: "Leche Eskimo Entera", p: 38, m: "Lala", c: "super", i: "🥛", b: "Popular" },
        { id: 4, n: "Carne Asada con Gallopinto", p: 160, m: "Fritanga Nica", c: "comida", i: "🥘", b: "Top" },
        { id: 5, n: "Gaseosa Roja 12oz", p: 25, m: "Coca-Cola", c: "bebidas", i: "🥤", b: "Nacional" },
        { id: 6, n: "Café Presto 200g", p: 115, m: "Nestlé", c: "super", i: "☕", b: "Indispensable" },
        { id: 7, n: "Vigorón Granadino", p: 120, m: "Doña Elba", c: "comida", i: "🍽️", b: "Tradición" },
        { id: 8, n: "Acetaminofén 500mg", p: 15, m: "Ramos", c: "farmacia", i: "💊", b: "Salud" }
    ],

    cart: [],

    init() {
        // Simulación de carga de servidores corporativos
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2200);

        this.renderProducts(this.products);
    },

    // RENDERIZADO VISUAL "QUE ENAMORA"
    renderProducts(items) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = items.map(p => `
            <div class="p-card" onclick="App.addToCart(${p.id})">
                <span class="p-badge">${p.b}</span>
                <div class="p-img">${p.i}</div>
                <div class="p-info">
                    <b>${p.n}</b>
                    <small>${p.m}</small>
                    <span class="p-price">C$ ${p.p}</span>
                </div>
            </div>
        `).join('');
    },   

    // LÓGICA DE CARRITO (REGISTRO NO OBLIGATORIO)
    addToCart(id) {
        const item = this.products.find(p => p.id === id);
        this.cart.push(item);
        document.getElementById('cart-count').innerText = this.cart.length;
        
        // Animación de feedback
        const btn = document.querySelector('.cart-btn');
        btn.classList.add('bump');
        setTimeout(() => btn.classList.remove('bump'), 300);
    },

    toggleCart() {
        const modal = document.getElementById('modal-checkout');
        modal.classList.toggle('active');
        this.renderCart();
    },

    renderCart() {
        const list = document.getElementById('cart-items');
        let sub = 0;
        list.innerHTML = this.cart.map(i => {
            sub += i.p;
            return `<div class="cart-row"><span>${i.n}</span><b>C$ ${i.p}</b></div>`;
        }).join('');
        
        document.getElementById('sub-val').innerText = `C$ ${sub}`;
        document.getElementById('total-val').innerText = `C$ ${sub + 40}`;
    },

    showLogin() {
        // AQUÍ es donde pedimos registro, solo cuando va a soltar la plata
        const name = prompt("Para confirmar el pedido, ingresa tu nombre y dirección de entrega:");
        if(name) {
            alert(`¡Gracias ${name}! Tu pedido de PinolApp está siendo procesado por nuestros motorizados.`);
            this.cart = [];
            this.toggleCart();
            location.reload();
        }
    },

    // NAVEGACIÓN SPA
    navigate(to) {
        if(to === 'config') {
            document.getElementById('view-config').classList.add('active');
        } else {
            document.getElementById('view-config').classList.remove('active');
        }
        
        // Cambiar iconos activos
        document.querySelectorAll('.dock-link').forEach(l => l.classList.remove('active'));
    },

    liveSearch(val) {
        const filtered = this.products.filter(p => 
            p.n.toLowerCase().includes(val.toLowerCase()) || 
            p.m.toLowerCase().includes(val.toLowerCase())
        );
        this.renderProducts(filtered);
    }
};

window.onload = () => App.init();
