const App = {
    // PERSISTENCIA: Carga y guarda en el teléfono
    storage: {
        get: () => JSON.parse(localStorage.getItem('Pinol_User_Data')) || { name: 'Yader Vasquez', cacaos: 150, cart: [] },
        save: (data) => localStorage.setItem('Pinol_User_Data', JSON.stringify(data))
    },

    db: [
        { id: 1, n: "Tip-Top", t: "comida", i: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=400", p: "Combo Nica", price: 210 },
        { id: 2, n: "Quesillos León", t: "comida", i: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400", p: "Quesillo Trenza", price: 85 },
        { id: 3, n: "Súper Express", t: "super", i: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400", p: "Leche 1L", price: 36 },
        { id: 4, n: "Artesanía Masaya", t: "artesania", i: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=400", p: "Hamaca", price: 1300 }
    ],

    init() {
        const user = this.storage.get();
        document.getElementById('user-name').innerText = user.name;
        document.getElementById('cacaos-val').innerText = user.cacaos;
        
        // Splash rápido
        setTimeout(() => document.getElementById('splash').style.display = 'none', 1500);
        this.render(this.db);
    },

    render(items) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = items.map(s => `
            <div class="card" onclick="App.addCart('${s.p}', ${s.price})">
                <img src="${s.i}">
                <div style="padding:10px;">
                    <h4>${s.n}</h4>
                    <span style="color:var(--red); font-weight:800;">C$ ${s.price}</span>
                </div>
            </div>
        `).join('');
    },

    addCart(name, price) {
        const user = this.storage.get();
        user.cart.push({name, price});
        this.storage.save(user);
        document.getElementById('cart-badge').innerText = user.cart.length;
        alert("¡Agregado!");
    },

    toggleDrawer() {
        document.getElementById('side-drawer').classList.toggle('open');
    },

    saveProfile() {
        const nameInput = document.getElementById('edit-name').value;
        if(!nameInput) return;
        const user = this.storage.get();
        user.name = nameInput;
        this.storage.save(user);
        document.getElementById('user-name').innerText = nameInput;
        this.toggleDrawer();
    }
};

window.onload = () => App.init();
