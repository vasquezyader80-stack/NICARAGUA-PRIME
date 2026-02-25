const PinolApp = {
    state: JSON.parse(localStorage.getItem('Pinol_App_Data')) || {
        cacaos: 300,
        cart: [],
        products: [
            { id: 1, name: "Quesillo Trenzado", price: 95, cat: "lácteos", img: "https://images.unsplash.com/photo-1585476482101-789a77490089?w=400" },
            { id: 2, name: "Café Matagalpa", price: 140, cat: "café", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" },
            { id: 3, name: "Nacatamal Navideño", price: 85, cat: "comida", img: "https://images.unsplash.com/photo-1599974590225-2af2fe2030f2?w=400" },
            { id: 4, name: "Hamaca de Hilo", price: 1250, cat: "artesanía", img: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?w=400" }
        ]
    },

    init() {
        // Pantalla de carga Pinol app
        setTimeout(() => {
            const splash = document.getElementById('splash');
            if(splash) {
                splash.style.opacity = '0';
                setTimeout(() => splash.style.display = 'none', 800);
            }
        }, 2800);

        this.render();
        this.sync();
    },

    sync() {
        document.getElementById('cacao-count').innerText = this.state.cacaos;
        document.getElementById('cart-badge').innerText = this.state.cart.length;
        localStorage.setItem('Pinol_App_Data', JSON.stringify(this.state));
    },

    // ... (funciones de render, filter, search y addToCart se mantienen iguales) ...

    checkout() {
        if(!this.state.cart.length) return;
        alert("🇳🇮 ¡Pedido en Camino!\n\nGracias por confiar en Pinol app. Yader Vasquez te desea una excelente compra.");
        this.state.cart = [];
        this.toggleCart();
        this.sync();
    }
};

window.onload = () => PinolApp.init();
