const App = {
    // PERSISTENCIA: Datos en memoria del teléfono
    state: {
        user: JSON.parse(localStorage.getItem('Pinol_User')) || { name: 'Yader Vasquez', cacaos: 100 },
        products: [
            { n: "Tip-Top", p: "Combo Nica", c: 220, i: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=400" },
            { n: "Quesillos", p: "Trenza Doble", c: 90, i: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400" },
            { n: "Artesanía", p: "Hamaca Masaya", c: 1400, i: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=400" },
            { n: "Súper", p: "Café Presto", c: 150, i: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" }
        ]
    },

    init() {
        this.updateUI();
        this.renderProducts();
    },

    updateUI() {
        document.getElementById('user-name').innerText = this.state.user.name;
        document.getElementById('cacaos-val').innerText = this.state.user.cacaos;
        localStorage.setItem('Pinol_User', JSON.stringify(this.state.user));
    },

    renderProducts() {
        const grid = document.getElementById('grid');
        grid.innerHTML = this.state.products.map(item => `
            <div class="product-card" onclick="App.reward()">
                <img src="${item.i}">
                <div><b>${item.n}</b><br><span style="color:var(--red)">C$ ${item.c}</span></div>
            </div>
        `).join('');
    },

    reward() {
        this.state.user.cacaos += 5;
        this.updateUI();
        alert("¡Ganaste 5 Cacaos!");
    },

    // ABRIR AJUSTES: La X se crea solo aquí
    openSettings() {
        const modal = document.getElementById('modal-container');
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-box">
                <button class="close-modal-btn" onclick="App.closeSettings()">✕</button>
                <h3>Perfil de Socio</h3>
                <p>Nombre actual: <b>${this.state.user.name}</b></p>
                <input type="text" id="new-name" placeholder="Nuevo nombre..." style="width:100%; padding:10px; margin-bottom:10px; border-radius:8px; border:1px solid #ddd;">
                <button onclick="App.saveName()" style="width:100%; padding:12px; background:var(--blue); color:#fff; border:none; border-radius:10px; font-weight:bold;">Guardar</button>
                <p style="font-size:0.6rem; margin-top:20px; color:#999;">Pinol App © 2026 - Propiedad de Yader Vasquez</p>
            </div>
        `;
    },

    closeSettings() {
        const modal = document.getElementById('modal-container');
        modal.style.display = 'none';
        modal.innerHTML = ''; // Borramos la X al cerrar
    },

    saveName() {
        const val = document.getElementById('new-name').value;
        if(val) {
            this.state.user.name = val;
            this.updateUI();
            this.closeSettings();
        }
    }
};

window.onload = () => App.init();
  
