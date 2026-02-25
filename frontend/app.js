// PERSISTENCIA TOTAL
let db = JSON.parse(localStorage.getItem('pinol_pro')) || [
    { nombre: "Fritanga El Güegüense", tipo: "Comida", dir: "Bo. San Antonio", icon: "🍲", envio: 30 },
    { nombre: "Mandados El Macho Ratón", tipo: "Envio", dir: "Todo Managua", icon: "🏍️", envio: 0 },
    { nombre: "Pulpería La Purísima", tipo: "Tienda", dir: "León", icon: "🛒", envio: 20 }
];

const feed = document.getElementById('feed-negocios');

function mostrar(lista = db) {
    feed.innerHTML = lista.map(n => `
        <div class="card">
            <div class="card-icon">${n.icon}</div>
            <div class="card-info">
                <h4>${n.nombre}</h4>
                <p>📍 ${n.dir}</p>
                <small>Envío: C$ ${n.envio}</small>
            </div>
            <button class="btn-pedir" onclick="alert('Conectando...')">Pedir</button>
        </div>
    `).join('');
}

function registrar() {
    const nombre = document.getElementById('reg-nombre').value;
    const tipo = document.getElementById('reg-tipo').value;
    const dir = document.getElementById('reg-dir').value;
    
    if(nombre && dir) {
        db.push({ nombre, tipo, dir, icon: tipo === 'Envio' ? '🏍️' : '🏪', envio: 45 });
        localStorage.setItem('pinol_pro', JSON.stringify(db)); // Persistencia
        mostrar();
        cerrar();
    }
}

function filtrar() {
    const val = document.getElementById('busqueda').value.toLowerCase();
    mostrar(db.filter(n => n.nombre.toLowerCase().includes(val)));
}

function abrirRegistro() { document.getElementById('modal').style.display = 'flex'; }
function cerrar() { document.getElementById('modal').style.display = 'none'; }

window.onload = () => mostrar();

