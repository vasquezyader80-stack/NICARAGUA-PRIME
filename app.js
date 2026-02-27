const App = {
    // RED INTEGRADA DE NICARAGUA: Catálogo Real
    inventory: [
        { id: 1, n: "Toña 12oz Pack (6)", p: 240, m: "Compañía Cervecera", c: "bebidas", i: "🍺" },
        { id: 2, n: "Queso Seco Ahumado", p: 105, m: "Lácteos de Chontales", c: "super", i: "🧀" },
        { id: 3, n: "Tip-Top Combo Familiar", p: 485, m: "Tip-Top Nicaragua", c: "restaurante", i: "🍗" },
        { id: 4, n: "Leche Eskimo Litro", p: 38, m: "Eskimo / Lala", c: "super", i: "🥛" },
        { id: 5, n: "Flor de Caña 7 Años", p: 470, m: "SER Licorera", c: "bebidas", i: "🥃" },
        { id: 6, n: "Cena Típica Completa", p: 160, m: "Fritanga Doña Tania", c: "restaurante", i: "🥘" },
        { id: 7, n: "Vigorón Granadino", p: 120, m: "El Kioskito", c: "restaurante", i: "🍽️" },
        { id: 8, n: "Café Presto 200g", p: 118, m: "Nestlé Nicaragua", c: "super", i: "☕" }
    ],   

    init() {
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2200);

        this.renderGrid(this.inventory);
    },

    renderGrid(items) {
        const grid = document.getElementById('main-grid');
        grid.innerHTML = items.map(p => `
            <div class="p-card" onclick="App.buy('${p.n}', ${p.p})">
                <div class="p-img">${p.i}</div>
                <b>${p.n}</b>
                <small>${p.m}</small>
                <span class="price-tag">C$ ${p.p}</span>
            </div>
        `).join('');
    },

    navigate(id, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${id}`).classList.add('active');
        document.querySelectorAll('.d-item').forEach(d => d.classList.remove('active'));
        if(el) el.classList.add('active');
    },

    search(val) {
        const res = this.inventory.filter(p => 
            p.n.toLowerCase().includes(val.toLowerCase()) || 
            p.m.toLowerCase().includes(val.toLowerCase())
        );
        this.renderGrid(res);
    },

    regBiz() {
        const biz = prompt("Ingresá el nombre de tu Restaurante o Tienda:");
        if(biz) alert(`¡Hola Yader! Hemos recibido la solicitud para ${biz}. Nuestro equipo te llamará para integrar tu catálogo.`);
    },

    regRider() {
        alert("Abriendo portal de registro para motorizados PinolApp...");
    },

    buy(n, p) {
        alert(`Añadiste ${n} (C$ ${p}) al carrito. ¡Gracias por preferir lo Nica!`);
    }
};

window.onload = () => App.init();
