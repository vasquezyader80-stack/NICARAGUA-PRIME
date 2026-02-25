const NicaApp = {
    state: JSON.parse(localStorage.getItem('NicaPrime_Store')) || {
        cacaos: 100,
        products: [],
        history: []
    },

    init() {
        this.render();
        this.updateUI();
        this.bindEvents();
    },

    save() {
        localStorage.setItem('NicaPrime_Store', JSON.stringify(this.state));
    },

    updateUI() {
        document.getElementById('balance-display').innerText = this.state.cacaos;
        document.getElementById('wallet-total').innerText = this.state.cacaos + " 🪙";
    },

    addProduct(name, price, category) {
        const product = { id: Date.now(), name, price, category };
        this.state.products.push(product);
        this.state.cacaos += 50;
        this.state.history.unshift({
            desc: `Venta/Reg: ${name}`,
            val: "+50",
            date: new Date().toLocaleDateString()
        });
        this.save();
        this.render();
        this.updateUI();
    },

    render() {
        const list = document.getElementById('product-list');
        list.innerHTML = this.state.products.length ? '' : '<p style="grid-column: 1/3; text-align:center;">No hay productos aún.</p>';
        this.state.products.slice().reverse().forEach(p => {
            list.innerHTML += `
                <div class="product-card">
                    <small style="color:var(--gold)">${p.category}</small>
                    <h4 style="margin:5px 0">${p.name}</h4>
                    <strong style="color:var(--primary)">C$ ${p.price}</strong>
                </div>
            `;
        });

        const historyBox = document.getElementById('history-box');
        historyBox.innerHTML = '';
        this.state.history.slice(0, 5).forEach(h => {
            historyBox.innerHTML += `
                <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee">
                    <span>${h.desc}</span>
                    <b style="color:green">${h.val}</b>
                </div>
            `;
        });
    },

    bindEvents() {
        document.getElementById('reg-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const n = document.getElementById('p-name').value;
            const p = document.getElementById('p-price').value;
            const c = document.getElementById('p-cat').value;
            this.addProduct(n, p, c);
            toggleModal('modal-reg');
            e.target.reset();
        });
    }
};

function toggleModal(id) {
    const m = document.getElementById(id);
    m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
}

window.onload = () => NicaApp.init();
