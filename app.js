const NicaApp = {
    // 1. CARGA DE DATOS (Persistent Data)
    state: JSON.parse(localStorage.getItem('NicaMarket_Pro_Data')) || {
        userName: "Yader Stack",
        cacaos: 150,
        products: []
    },

    init() {
        this.updateUI();
        this.renderProducts();
        console.log("🚀 Tierra Nica Pro: Sistema de persistencia listo.");
    },

    // 2. GUARDADO AUTOMÁTICO
    save() {
        localStorage.setItem('NicaMarket_Pro_Data', JSON.stringify(this.state));
    },

    // 3. REGISTRO DE PRODUCTOS
    registerProduct() {
        const nameInput = document.getElementById('p-name');
        const priceInput = document.getElementById('p-price');

        if (!nameInput.value || !priceInput.value) {
            alert("Por favor, llena todos los campos");
            return;
        }

        const newProduct = {
            id: Date.now(),
            name: nameInput.value,
            price: priceInput.value,
            seller: this.state.userName
        };

        this.state.products.push(newProduct);
        this.state.cacaos += 25; // Recompensa por registro
        
        this.save(); // Persistencia inmediata
        this.renderProducts();
        this.updateUI();

        // Limpiar campos
        nameInput.value = '';
        priceInput.value = '';
        alert("✅ ¡Producto registrado exitosamente!");
    },

    updateUI() {
        document.getElementById('balance-display').innerText = this.state.cacaos;
        document.getElementById('user-name').innerText = this.state.userName;
    },

    renderProducts() {
        const list = document.getElementById('product-list');
        list.innerHTML = '';
        
        this.state.products.forEach(p => {
            list.innerHTML += `
                <div class="product-card">
                    <h4>${p.name}</h4>
                    <p>C$ ${p.price}</p>
                    <small>Vendedor: ${p.seller}</small>
                </div>
            `;
        });
    },

    resetApp() {
        if(confirm("¿Seguro que quieres borrar todos los datos guardados?")) {
            localStorage.removeItem('NicaMarket_Pro_Data');
            location.reload();
        }
    }
};

window.onload = () => NicaApp.init();
