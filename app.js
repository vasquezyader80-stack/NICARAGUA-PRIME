const App = {
    init() {
        // Simular carga profesional
        setTimeout(() => {
            document.getElementById('splash').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
        }, 3000);

        // Cargar nombre si existe
        this.data = JSON.parse(localStorage.getItem('PinolUserData')) || { name: "Invitado", stores: [] };
    },

    navigate(viewId, element) {
        // Cambiar vista
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');

        // Actualizar Tabs
        if (element) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            element.classList.add('active');
        }
    },

    action(type) {
        // Esto le da "vida" a las opciones muertas
        alert(`${type}: Esta función estará disponible en la próxima actualización local.`);
    },

    registerBusiness() {
        const name = prompt("Ingrese el nombre de su negocio local:");
        if (name) {
            this.data.stores.push({ name: name, date: new Date().toLocaleDateString() });
            localStorage.setItem('PinolUserData', JSON.stringify(this.data));
            alert(`¡Éxito! El negocio "${name}" ha sido guardado en la memoria del teléfono.`);
        }
    },

    quickFilter(cat) {
        alert("Filtrando por: " + cat);
        // Aquí podrías filtrar los productos locales
    }
};

window.onload = () => App.init();
