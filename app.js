const App = {
    // 1. GESTIÓN DE MEMORIA (LocalStorage)
    state: {
        get: () => {
            const saved = localStorage.getItem('PinolAppData_V1');
            return saved ? JSON.parse(saved) : {
                userName: "Yader Vasquez",
                cacaos: 150,
                myProducts: [] // Productos registrados por el usuario
            };
        },
        save: (data) => localStorage.setItem('PinolAppData_V1', JSON.stringify(data))
    },

    // 2. PRODUCTOS POR DEFECTO (Red General)
    defaultData: [
        { id: 1, n: "Gallo Pinto con Cerdo", p: 150, c: "comida", i: "🥘", s: "Fritanga Doña Tania" },
        { id: 2, n: "Toña Lite 12oz", p: 45, c: "tienda", i: "🍺", s: "Pulpería El Sol" },
        { id: 3, n: "Mandado Express", p: 60, c: "envio", i: "🏍️", s: "Pinol Delivery" }
    ],

    init() {
        const data = this.state.get();
        document.getElementById('user-name-display').innerText = data.userName;
        document.getElementById('cacaos-balance').innerText = data.cacaos;

        // Splash screen delay
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').style.display = 'block';
        }, 2000);

        this.renderAll();
        this.renderInventory();
    },

    // 3. RENDERIZAR TODO EL MARKETPLACE
    renderAll(filterVal = 'all') {
        const data = this.state.get();
        const grid = document.getElementById('product-grid');
        
        // Unir productos fijos con los guardados en el celular
        let all = [...data.myProducts, ...this.defaultData];

        if(filterVal !== 'all') {
            all = all.filter(p => p.c === filterVal);
        }

        grid.innerHTML = all.map(p => `
            <div class="p-card">
                <div class="p-img">${p.i || '📦'}</div>
                <div class="p-info">
                    <b>${p.n}</b>
                    <small>${p.s || 'Vendedor Local'}</small>
                    <span class="price">C$ ${p.p}</span>
                </div>
                <button class="btn-buy" onclick="alert('Pedido en camino...')">Pedir</button>
            </div>
        `).join('');
    },

    // 4. FUNCIONES DE VENDEDOR (SOCIO)
    saveProduct() {
        const name = document.getElementById('new-p-name').value;
        const price = document.getElementById('new-p-price').value;
        const cat = document.getElementById('new-p-cat').value;

        if(!name || !price) return alert("Por favor, completa los campos.");

        const data = this.state.get();
        const newProd = {
            id: Date.now(),
            n: name,
            p: parseInt(price),
            c: cat,
            i: cat === 'comida' ? '🥘' : (cat === 'tienda' ? '🛒' : '🏍️'),
            s: data.userName // Registra al usuario actual como vendedor
        };

        data.myProducts.unshift(newProd);
        this.state.save(data);
        
        // Limpiar y actualizar
        document.getElementById('new-p-name').value = "";
        document.getElementById('new-p-price').value = "";
        alert("¡Producto guardado exitosamente en tu teléfono!");
        
        this.renderAll();
        this.renderInventory();
    },

    renderInventory() {
        const data = this.state.get();
        const container = document.getElementById('my-inventory');
        
        if(data.myProducts.length === 0) {
            container.innerHTML = "<p style='color:gray; font-size:12px;'>No has registrado productos aún.</p>";
            return;
        }

        container.innerHTML = data.myProducts.map(p => `
            <div class="inv-item">
                <span>${p.n} (C$ ${p.p})</span>
                <button class="btn-del" onclick="App.deleteProduct(${p.id})">X</button>
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

    // 5. NAVEGACIÓN Y FILTROS
    navigate(viewId, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        document.querySelectorAll('.d-item').forEach(d => d.classList.remove('active'));
        btn.classList.add('active');
    },

    filter(cat, btn) {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        this.renderAll(cat);
    },

    search(val) {
        const data = this.state.get();
        const all = [...data.myProducts, ...this.defaultData];
        const filtered = all.filter(p => p.n.toLowerCase().includes(val.toLowerCase()));
        
        const grid = document.getElementById('product-grid');
        grid.innerHTML = filtered.map(p => `
            <div class="p-card">
                <div class="p-img">${p.i || '📦'}</div>
                <div class="p-info">
                    <b>${p.n}</b>
                    <small>${p.s || 'Vendedor Local'}</small>
                    <span class="price">C$ ${p.p}</span>
                </div>
            </div>
        `).join('');
    }
};

window.onload = () => App.init();
