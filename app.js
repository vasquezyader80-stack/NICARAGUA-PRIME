const App = {
    init() {
        // Cargar datos de LocalStorage
        this.loadStorage();

        // Ocultar Splash tras carga
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2800);
    },

    loadStorage() {
        const user = localStorage.getItem('user_p') || "Nica User";
        console.log("Bienvenido de nuevo, " + user);
    },

    navigate(view, el) {
        // 1. Ocultar todas las vistas
        document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
        
        // 2. Mostrar la elegida
        document.getElementById(`view-${view}`).classList.add('active');

        // 3. Activar Tab visualmente
        if(el) {
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    },

    sellerPanel() {
        const bizName = prompt("Nombre de tu negocio:");
        if(bizName) {
            // Persistencia de datos
            let myStores = JSON.parse(localStorage.getItem('my_stores')) || [];
            myStores.push(bizName);
            localStorage.setItem('my_stores', JSON.stringify(myStores));
            alert(`¡Felicidades! ${bizName} ahora está registrado en PinolApp.`);
        }
    },

    openHelp() {
        alert("Conectando con soporte de PinolApp 🇳🇮...");
    }
};

window.onload = () => App.init();
