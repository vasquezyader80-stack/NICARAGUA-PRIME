const App = {
    init() {
        // Cargar datos de persistencia (LocalStorage)
        this.user = JSON.parse(localStorage.getItem('PinolApp_User')) || { name: "Yader", stores: [] };
        
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').classList.add('hidden');
                document.getElementById('app').classList.remove('hidden');
            }, 800);
        }, 2800);
    },

    nav(viewId, el) {
        // Cambiar de pantalla con efecto
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');

        // Actualizar el menú inferior
        if(el) {
            document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    },

    openSellerPanel() {
        const storeName = prompt("🏬 Nombre de tu negocio local:");
        if(storeName) {
            this.user.stores.push({ name: storeName, date: new Date().toLocaleDateString() });
            localStorage.setItem('PinolApp_User', JSON.stringify(this.user));
            alert(`¡Nítido! Tu negocio "${storeName}" ha sido guardado exitosamente. 🇳🇮`);
        }
    },

    showFeature(name) {
        alert(`${name}: Esta sección se activará al conectar con el servidor real de PinolApp.`);
    }
};

window.onload = () => App.init();
