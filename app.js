const App = {
    init() {
        // Cargar datos del usuario
        const userData = JSON.parse(localStorage.getItem('user_n')) || { name: "Yader", cacaos: 100 };
        
        // Animación Splash
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 500);
        }, 2500);
    },

    navigate(viewId, el) {
        // Cambiar Pantallas
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');

        // Cambiar estado de Tabs
        if(el) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
        }
    },

    openBusiness() {
        const prod = prompt("Nombre del producto local (Nacatamal, Vigorón, etc):");
        if(prod) {
            alert(`¡Excelente! Tu producto "${prod}" ha sido registrado en la memoria del teléfono.`);
            // Aquí guardaríamos en LocalStorage como pediste
        }
    }
};

window.onload = () => App.init();
