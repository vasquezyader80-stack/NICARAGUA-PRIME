const App = {
    // 1. CARGA DE DATOS (PERSISTENCIA)
    state: {
        get: () => {
            const saved = localStorage.getItem('PinolApp_Data');
            return saved ? JSON.parse(saved) : {
                user: "Yader",
                myProducts: [] // Productos registrados por el socio
            };
        },
        save: (data) => localStorage.setItem('PinolApp_Data', JSON.stringify(data))
    },

    // 2. PRODUCTOS DE LA RED (MARCAS NACIONALES)
    networkProducts: [
        { id: 1, n: "Toña 12oz Pack", p: 245, c: "bebidas", m: "Cervecera Nacional", i: "🍺" },
        { id: 2, n: "Cerdo Asado con Gallo Pinto", p: 160, c: "comida", m: "Fritanga Doña Tania", i: "🥘" },
        { id: 3, n: "Leche Eskimo 1L", p: 38, m: "Eskimo Nicaragua", c: "super", i: "🥛" },
        { id: 4, n: "Flor de Caña 7 Años", p: 480, m: "SER Licorera", c: "bebidas", i: "🥃" },
        { id: 5, n: "Queso Seco (Libra)", p: 95, m: "Lácteos Chontales", c: "super", i: "🧀" }
    ],

    init() {
        const data = this.state.get();
        document.getElementById('display-user-name').innerText = data.user;
        
        // Simulación de carga fluida
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 1500);

        this.renderAll();
    },

    // 3. RENDERIZADO DEL MARKETPLACE
    renderAll() {
        const data = this.state.get();
        const grid = document.getElementById('product-grid');
        // Unimos productos de la red + productos del socio
        const all = [...data.myProducts, ...this.networkProducts];
        
        grid.innerHTML = all.map(p => `
            <div class="p-card">
                <div class="p-img">${p.i || '📦'}</div>
                <div class="p-info">
                    <b>${p.n}</b>
                    <small>${p.m || 'Socio Local'}</small>
                    <span class="price">C$ ${p.p}</span>
                </div>
            </div>
        `).join('');
    },

    // 4. FUNCIONALIDAD DEL SOCIO (VENDEDOR)
    saveProduct() {
        const name = document.getElementById('new-p-name').value;
        const price = document.getElementById('new-p-price').value;
        const cat = document.getElementById('new-p-cat').value;

        if(!name || !price) return alert("Por favor llena los datos");

        const data = this.state.get();
        const newProd = {
            id: Date.now(),
            n: name,
            p: parseInt(price),
            c: cat,
            m: `Tienda de ${data.user}`,
            i: "🏪"
        };

        data.myProducts.unshift(newProd);
        this.state.save(data);
        
        // Reset y actualización
        document.getElementById('new-p-name').value = "";
        document.getElementById('new-p-price').value = "";
        alert("¡Producto registrado en tu memoria local!");
        this.renderAll();
        this.renderInventory();
    },

    renderInventory() {
        const data = this.state.get();
        const container = document.getElementById('my-inventory');
        container.innerHTML = data.myProducts.map(p => `
            <div class="inv-item">
                <span>${p.n} - C$ ${p.p}</span>
                <button onclick="App.deleteProduct(${p.id})">Eliminar</button>
            </div>
        `).join('');
    },

    deleteProduct(id) {
        let data = this.state.get();
        data.myProducts = data.myProducts.filter(p => p.id !== id);
        this.state.save(data);
        this.renderAll();
        this.renderInventory();
    },

    // 5. NAVEGACIÓN
    navigate(viewId, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        document.querySelectorAll('.d-item').forEach(d => d.classList.remove('active'));
        if(btn) btn.classList.add('active');

        if(viewId === 'socio') this.renderInventory();
    },

    search(val) {
        const data = this.state.get();
        const all = [...data.myProducts, ...this.networkProducts];
        const filtered = all.filter(p => p.n.toLowerCase().includes(val.toLowerCase()));
        
        const grid = document.getElementById('product-grid');
        grid.innerHTML = filtered.map(p => `
            <div class="p-card">
                <div class="p-img">${p.i || '📦'}</div>
                <div class="p-info">
                    <b>${p.n}</b>
                    <small>${p.m || 'Socio Local'}</small>
                    <span class="price">C$ ${p.p}</span>
                </div>
            </div>
        `).join('');
    }
};

window.onload = () => App.init();
