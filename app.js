const App = {
    // Datos iniciales o cargados del teléfono
    data: {
        user: JSON.parse(localStorage.getItem('Pinol_DB')) || { name: 'Yader Vasquez', cacaos: 100 },
        products: [
            { n: "Tip-Top", p: "Pollo Frito", c: 250, i: "https://images.unsplash.com/photo-1562967914-6cbb22e2c91c?w=300" },
            { n: "Quesillos", p: "León Tradición", c: 90, i: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=300" },
            { n: "Súper", p: "Arroz 10lb", c: 180, i: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=300" },
            { n: "Nica", p: "Cacao Puro", c: 45, i: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300" }
        ]
    },

    init() {
        // Cargar nombre y cacaos al iniciar
        document.getElementById('user-input').value = this.data.user.name;
        document.getElementById('cacaos-val').innerText = this.data.user.cacaos;
        this.render();
    },

    render() {
        const grid = document.getElementById('grid');
        grid.innerHTML = this.data.products.map(item => `
            <div class="card">
                <img src="${item.i}">
                <b>${item.n}</b>
                <button onclick="App.buy(${item.c})">C$ ${item.c}</button>
            </div>
        `).join('');
    },

    buy(price) {
        this.data.user.cacaos += 5; // Gana cacaos por comprar
        this.save();
        document.getElementById('cacaos-val').innerText = this.data.user.cacaos;
        alert("¡Compra exitosa! Ganaste 5 Cacaos.");
    },

    saveName() {
        const val = document.getElementById('user-input').value;
        if(val) {
            this.data.user.name = val;
            this.save();
            alert("Nombre guardado: " + val);
        }
    },

    save() {
        // Guardar físicamente en la memoria del teléfono
        localStorage.setItem('Pinol_DB', JSON.stringify(this.data.user));
    }
};

window.onload = () => App.init();
