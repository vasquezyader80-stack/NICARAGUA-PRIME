const App = {
    data: JSON.parse(localStorage.getItem('NicaPro_Data')) || {
        cacaos: 100,
        inventory: [],
        history: []
    },

    init() {
        this.render();
        this.updateUI();
        this.bindEvents();
    },

    save() {
        localStorage.setItem('NicaPro_Data', JSON.stringify(this.data));
    },

    updateUI() {
        document.getElementById('balance-display').innerText = this.data.cacaos;
        document.getElementById('wallet-total').innerText = this.data.cacaos + " 🪙";
    },

    addProduct(name, price, category) {
        const product = { id: Date.now(), name, price, category };
        this.data.inventory.push(product);
        
        // Regla de Negocio: +50 Cacaos
        this.data.cacaos += 50;
        this.data.history.unshift({
            text: `Registro de ${name}`,
            val: "+50",
            date: new Date().toLocaleDateString()
        });

        this.save();
        this.updateUI();
        this.render();
    },

    render() {
        const list = document.getElementById('product-list');
        list.innerHTML = '';
        this.data.inventory.slice().reverse().forEach(p => {
            list.innerHTML += `
                <div class="product-card">
                    <small>${p.category}</small>
                    <h4>${p.name}</h4>
                    <span class="price">C$ ${p.price}</span>
                </div>
            `;
        });

        const historyBox = document.getElementById('history-box');
        historyBox.innerHTML = '';
        this.data.history.slice(0, 5).forEach(h => {
            historyBox.innerHTML += `
                <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee">
                    <span>${h.text}</span>
                    <strong style="color:green">${h.val}</strong>
                </div>
            `;
        });
    },

    bindEvents() {
        document.getElementById('reg-form').onsubmit = (e) => {
            e.preventDefault();
            const n = document.getElementById('p-name').value;
            const p = document.getElementById('p-price').value;
            const c = document.getElementById('p-cat').value;
            this.addProduct(n, p, c);
            toggleModal('modal-reg');
            e.target.reset();
        };
    }
};

function toggleModal(id) {
    const m = document.getElementById(id);
    m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
}

window.onload = () => App.init();
