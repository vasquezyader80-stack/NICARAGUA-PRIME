const NicaApp = {
    state: JSON.parse(localStorage.getItem('NicaMarket_v2')) || {
        cacaos: 250,
        products: [
            { id: 1, name: "Quesillo Especial", price: 95, shipping: 35, img: "https://images.unsplash.com/photo-1585476482101-789a77490089?auto=format&fit=crop&w=300", tag: "La Paz Centro" },
            { id: 2, name: "Café Prestigio 1lb", price: 145, shipping: 0, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300", tag: "Matagalpa" },
            { id: 3, name: "Nacatamal de Cerdo", price: 80, shipping: 40, img: "https://images.unsplash.com/photo-1599974590225-2af2fe2030f2?auto=format&fit=crop&w=300", tag: "Masaya" },
            { id: 4, name: "Hamaca Matrimonial", price: 1200, shipping: 150, img: "https://images.unsplash.com/photo-1519920101044-899312b9bb82?auto=format&fit=crop&w=300", tag: "San Juan de Oriente" }
        ]
    },

    init() {
        this.render();
        this.updateUI();
    },

    save() {
        localStorage.setItem('NicaMarket_v2', JSON.stringify(this.state));
    },

    updateUI() {
        document.getElementById('cacao-balance').innerText = this.state.cacaos;
    },

    toggleRegister() {
        const modal = document.getElementById('register-modal');
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    },

    addNewProduct() {
        const name = document.getElementById('new-p-name').value;
        const price = document.getElementById('new-p-price').value;
        const img = document.getElementById('new-p-img').value || "https://via.placeholder.com/300";

        if(!name || !price) return alert("Completa los datos esenciales");

        const product = {
            id: Date.now(),
            name,
            price: parseInt(price),
            shipping: 45, // Costo de envío base
            img: img,
            tag: "Vendedor Nuevo"
        };

        this.state.products.unshift(product);
        this.state.cacaos += 100; // Premio por vender
        this.save();
        this.render();
        this.updateUI();
        this.toggleRegister();
        alert("¡Producto publicado! Ganaste 100 Cacaos por fomentar la economía local.");
    },

    render() {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = this.state.products.map(p => `
            <div class="product-card">
                <img src="${p.img}" class="p-img" alt="${p.name}">
                <div class="p-info">
                    <h4>${p.name}</h4>
                    <p class="p-tag">📍 ${p.tag}</p>
                    <p class="p-price">C$ ${p.price}</p>
                    <p class="p-shipping">${p.shipping === 0 ? '🛵 Envío Gratis' : '🛵 Envío: C$ ' + p.shipping}</p>
                </div>
            </div>
        `).join('');
    }
};

window.onload = () => NicaApp.init(); 
