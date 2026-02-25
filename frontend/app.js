let baseDatos = JSON.parse(localStorage.getItem('pinol_db')) || [
    { nombre: "Fritanga Doña Josefa", tipo: "Comida", dir: "Bo. San Judas", icon: "🍲", envio: 30 },
    { nombre: "Repuestos El Rayo", tipo: "Servicio", dir: "Pista Suburbana", icon: "⚙️", envio: 60 }
];

function cargarFeed(filtro = "") {
    const feed = document.getElementById('feed-negocios');
    if(!feed) return;
    feed.innerHTML = "";
    baseDatos.filter(n => n.nombre.toLowerCase().includes(filtro.toLowerCase())).forEach(n => {
        feed.innerHTML += `
            <div class="card-negocio">
                <div style="font-size:40px">${n.icon}</div>
                <div style="flex-grow:1">
                    <h4>${n.nombre}</h4>
                    <p style="font-size:12px;color:gray">📍 ${n.dir}</p>
                    <b style="color:green">C$ ${n.envio}</b>
                </div>
                <button class="btn-pedir" onclick="alert('Pedido enviado!')">Pedir</button>
            </div>`;
    });
}

function registrar() {
    const nombre = document.getElementById('reg-nombre').value;
    const tipo = document.getElementById('reg-tipo').value;
    const dir = document.getElementById('reg-dir').value;
    if(nombre && dir) {
        baseDatos.unshift({ nombre, tipo, dir, icon: tipo === 'Envio' ? '🏍️' : '🏪', envio: 40 });
        localStorage.setItem('pinol_db', JSON.stringify(baseDatos));
        cargarFeed();
        cerrarRegistro();
    }
}

function filtrar() { cargarFeed(document.getElementById('busqueda').value); }
function abrirRegistro() { document.getElementById('modal-registro').style.display = 'flex'; }
function cerrarRegistro() { document.getElementById('modal-registro').style.display = 'none'; }
window.onload = () => cargarFeed();
