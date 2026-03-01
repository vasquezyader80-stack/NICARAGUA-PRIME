const App = {
    init() {
        // Carga el nombre del usuario guardado
        const savedName = localStorage.getItem('userName') || "Yader";
        console.log("Sistema cargado para: " + savedName);
    },

    navigate(screenId, element) {
        // 1. Apagar todas las pantallas
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        
        // 2. Encender la que tocaste
        const target = document.getElementById(`view-${screenId}`);
        if(target) target.classList.add('active');

        // 3. Iluminar el botón del menú
        if(element) {
            document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            element.classList.add('active');
        }
    },

    openSeller() {
        const name = prompt("¿Cómo se llama tu negocio?");
        if(name) {
            // Persistencia: Se guarda en el teléfono
            let myStores = JSON.parse(localStorage.getItem('myStores')) || [];
            myStores.push({ name: name, date: new Date().toLocaleDateString() });
            localStorage.setItem('myStores', JSON.stringify(myStores));
            
            alert(`¡Buenísimo! ${name} ya está registrado en PinolApp 🇳🇮`);
        }
    }
};

window.onload = () => App.init();
