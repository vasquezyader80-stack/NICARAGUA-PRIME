const App = {
    // 1. BASE DE DATOS LOCAL (Persistencia)
    storage: {
        get: () => {
            const data = localStorage.getItem('PinolApp_DB');
            return data ? JSON.parse(data) : {
                user: { name: "Yader Vasquez", cacaos: 250, location: "Managua" },
                myProducts: [] // Productos creados por el vendedor
            };
        },
        save: (data) => localStorage.setItem('PinolApp_DB', JSON.stringify(data))
    },

    // 2. PRODUCTOS LOCALES DE NICARAGUA
    localCatalog: [
        { id: 1, n: "Nacatamal Especial", p: 120, c: "comida", i: "🫔", s: "Delicias Nicas" },
        { id: 2, n: "Toña 12oz (Pack 6)", p: 260, c: "bebidas", i: "🍺", s: "Super Express" },
        { id: 3, n: "Queso de Exportación (Lb)", p: 95, c: "super", i: "🧀", s: "Lácteos Chontales" },
        { id: 4, n: "Vigorón Mixto", p: 140, c: "comida", i: "🥗", s: "El Kiosko" },
        { id: 5, n: "Cacao con Leche 1L", p: 45, c: "bebidas", i: "🥤", s: "Eskimo" },
        { id: 6, n: "Mandadito Urbano", p: 50, c: "envios", i: "🏍️", s: "Pinolero Go" }
    ],

    init() {
        const data = this.storage.get();
        this.updateUI(data);

        // Splash screen animado
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2500);

        this.renderHome();
    },

    updateUI(data) {
        document.getElementById('display-name').innerText = data.user.name;
        document.getElementById('display-cacaos').innerText = `💰 ${data.user.cacaos} Cacaos acumulados`;
        document.getElementById('user-location').innerText = data.user.location;
    },

    // 3. RENDERIZADO DEL MARKETPLACE
    renderHome(filter = 'all') {
        const data = this.storage.get();
        const grid = document.getElementById('product-grid');
        
        // Combinamos productos de la app + productos del vendedor
        let all = [...data.myProducts, ...this.localCatalog];

        if(filter !== 'all') {
            all = all.filter(p => p.c === filter);
        }

        grid.innerHTML = all.map(p => `
            <div class="card">
                <div class="card-badge">Envío Gratis</div>
                <div class="card-img">${p.i || '📦'}</div>
                <div class="card-body">
                    <h4 class="p-title">${p.n}</h4>
                    <p class="p-seller">${p.s}</p>
                    <div class="p-footer">
                        <span class="price">C$ ${p.p}</span>
                        <button class="add-btn">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // 4. FUNCIONES DE VENDEDOR
    saveProduct() {
        const name = document.getElementById('p-name').value;
        const price = document.getElementById('p-price').value;
        const cat = document.getElementById('p-cat').value;

        if(!name || !price) return alert("¡Brother, llena todos los datos!");

        const data = this.storage.get();
        const newProduct = {
            id: Date.now(),
            n: name,
            p: parseInt(price),
            c: cat,
            i: "🏪",
            s: `Tienda de ${data.user.name.split(' ')[0]}`
        };

        data.myProducts.unshift(newProduct);
        this.storage.save(data);
        
        // Reset y feedback
        document.getElementById('p-name').value = "";
        document.getElementById('p-price').value = "";
        alert("¡Producto publicado exitosamente!");
        this.renderInventory();
        this.renderHome();
    }, 

    renderInventory() {
        const data = this.storage.get();
        const container = document.getElementById('seller-inventory');
        container.innerHTML = data.myProducts.map(p => `
            <div class="inv-item">
                <span>${p.n} - C$ ${p.p}</span>
                <button onclick="App.deleteProduct(${p.id})">Eliminar</button>
            </div>
        `).join('');
    },

    deleteProduct(id) {
        let data = this.storage.get();
        data.myProducts = data.myProducts.filter(p => p.id !== id);
        this.storage.save(data);
        this.renderInventory();
        this.renderHome();
    },

    // 5. NAVEGACIÓN
    navigate(viewId, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        if(btn) {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        if(viewId === 'home') this.renderHome();
    },

    openSellerPanel() {
        this.navigate('seller');
        this.renderInventory();
    },

    filter(cat, btn) {
        document.querySelectorAll('.cat-item').forEach(c => c.style.transform = 'scale(1)');
        btn.style.transform = 'scale(1.1)';
        this.renderHome(cat);
    },

    search(val) {
        const data = this.storage.get();
        const all = [...data.myProducts, ...this.localCatalog];
        const filtered = all.filter(p => p.n.toLowerCase().includes(val.toLowerCase()));
        
        const grid = document.getElementById('product-grid');
        grid.innerHTML = filtered.map(p => `
            <div class="card">
                <div class="card-img">${p.i || '📦'}</div>
                <div class="card-body">
                    <h4>${p.n}</h4>
                    <p>${p.s}</p>
                    <span class="price">C$ ${p.p}</span>
                </div>
            </div>
        `).join('');
    }
};

window.onload = () => App.init();
