const App = {
    // 1. BASE DE DATOS SEGURA
    db: {
        get: () => {
            try {
                const data = localStorage.getItem('Pinol_DB_Final');
                return data ? JSON.parse(data) : { cacaos: 150, user: "Yader", products: [] };
            } catch (e) {
                return { cacaos: 150, user: "Yader", products: [] };
            }
        },
        save: (data) => localStorage.setItem('Pinol_DB_Final', JSON.stringify(data))
    },

    // 2. INICIO FORZOSO (Aquí arreglamos el trabón)
    init() {
        console.log("PinolApp Iniciando...");
        this.updateUI();
        this.renderFeed();
        
        // Forzamos la salida del Splash aunque algo falle
        const splash = document.getElementById('splash');
        const app = document.getElementById('app');

        setTimeout(() => {
            if (splash) splash.style.opacity = '0';
            setTimeout(() => {
                if (splash) splash.style.display = 'none';
                if (app) app.classList.remove('hidden');
                console.log("App lista y visible");
            }, 600);
        }, 2000); // 2 segundos exactos de espera
    },

    // 3. NAVEGACIÓN REAL
    nav(viewId, el) {
        // Ocultar todas las pantallas
        const views = document.querySelectorAll('.view');
        views.forEach(v => v.classList.remove('active'));
        
        // Mostrar la elegida
        const target = document.getElementById(`view-${viewId}`);
        if (target) {
            target.classList.add('active');
        } else {
            console.error("No se encontró la vista: view-" + viewId);
        }

        // Iluminar botón del menú
        if (el) {
            document.querySelectorAll('.dock-tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    },

    // 4. FUNCIONES DE VENDEDOR
    renderFeed() {
        const feed = document.getElementById('product-feed');
        if (!feed) return;

        const data = this.db.get();
        const catalog = [
            { n: "Nacatamal", p: 120, s: "Fritanga Nica", i: "🫔" },
            { n: "Vigorón", p: 140, s: "Granada", i: "🥗" }
        ];
        
        const all = [...data.products, ...catalog];
        feed.innerHTML = all.map(p => `
            <div class="card-item">
                <span>${p.i}</span>
                <b>${p.n}</b>
                <p>C$ ${p.p}</p>
            </div>
        `).join('');
    },

    updateUI() {
        const data = this.db.get();
        const display = document.getElementById('cacaos-display');
        if (display) display.innerText = data.cacaos;
    },

    openSeller() {
        const name = prompt("¿Qué quieres vender?");
        if(name) {
            const data = this.db.get();
            data.products.push({ n: name, p: 100, s: "Local", i: "🏬" });
            this.db.save(data);
            this.renderFeed();
            alert("¡Guardado en el teléfono!");
        }
    }
};

// Arrancar App
window.onload = () => App.init();
