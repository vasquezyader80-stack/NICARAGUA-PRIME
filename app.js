const App = {
    // MEMORIA DEL TELÉFONO
    db: {
        get: () => JSON.parse(localStorage.getItem('Pinol_DB')) || { cacaos: 500, user: "Yader", products: [] },
        save: (data) => localStorage.setItem('Pinol_DB', JSON.stringify(data))
    },

    init() {
        this.render();
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
        }, 3000);
    },

    nav(viewId, el) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        
        if(el) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    },

    render() {
        const data = this.db.get();
        document.getElementById('cacaos-val').innerText = data.cacaos;
        
        const feed = document.getElementById('feed');
        const items = [{n:"Nacatamal", p:120, s:"Doña Mary", i:"🫔"}, ...data.products];
        
        feed.innerHTML = items.map(p => `
            <div class="card" style="background:white; padding:15px; border-radius:15px; margin:10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                <span style="font-size:30px;">${p.i || '📦'}</span>
                <h4>${p.n}</h4>
                <p>C$ ${p.p}</p>
                <button onclick="App.buy()" style="width:100%; background:var(--blue); color:white; border:none; padding:8px; border-radius:8px;">Pedir</button>
            </div>
        `).join('');
    },

    sellerMode() {
        const name = prompt("¿Qué vas a vender hoy?");
        if(name) {
            const data = this.db.get();
            data.products.push({n: name, p: 100, s: "Local", i: "🏪"});
            this.db.save(data);
            this.render();
            alert("¡Producto registrado en tu memoria local!");
        }
    },

    action(msg) { alert(msg + " se activará en la versión final con servidor."); }
};

window.onload = () => App.init();
