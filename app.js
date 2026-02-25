const PinolApp = {
    // PERSISTENCIA: Data que no se borra (LocalStorage)
    data: {
        user: JSON.parse(localStorage.getItem('YaderApp_User')) || { name: 'Yader Vasquez', cacaos: 150 },
        items: [
            { n: "Tip-Top", p: "Combo Pechugas", c: 250, i: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=400" },
            { n: "Quesillos León", p: "Doble Crema", c: 95, i: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400" },
            { n: "Súper Express", p: "Leche Parmalat", c: 38, i: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400" },
            { n: "Café Jinotega", p: "Bolsa 1lb", c: 140, i: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" }
        ]
    },

    init() {
        // Actualizar interfaz con datos guardados
        document.getElementById('user-name').innerText = this.data.user.name;
        document.getElementById('cacaos-val').innerText = this.data.user.cacaos;
        this.render();
    },

    render() {
        const grid = document.getElementById('grid');
        grid.innerHTML = this.data.items.map(item => `
            <div class="card" onclick="PinolApp.buy('${item.p}')">
                <img src="${item.i}">
                <div class="card-info">
                    <small>${item.n}</small><br>
                    <b>C$ ${item.c}</b>
                </div>
            </div>
        `).join('');
    },

    buy(product) {
        // Ganar 5 Cacaos por cada compra
        this.data.user.cacaos += 5;
        this.save();
        alert(`¡Compraste ${product}! Ganaste 5 Cacaos.`);
        document.getElementById('cacaos-val').innerText = this.data.user.cacaos;
    },

    // ABRIR Y CERRAR MENÚ (Aquí se controla la X)
    toggleDrawer() {
        const drawer = document.getElementById('side-drawer');
        const isVisible = drawer.style.display === 'block';
        drawer.style.display = isVisible ? 'none' : 'block';
    },

    saveUser() {
        const newName = document.getElementById('input-name').value;
        if(newName) {
            this.data.user.name = newName;
            this.save();
            document.getElementById('user-name').innerText = newName;
            this.toggleDrawer();
        }
    },

    save() {
        localStorage.setItem('YaderApp_User', JSON.stringify(this.data.user));
    }
};

window.onload = () => PinolApp.init();
