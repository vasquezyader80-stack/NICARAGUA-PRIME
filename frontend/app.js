// Cargar datos al iniciar
let negocios = JSON.parse(localStorage.getItem('pinol_db')) || [];

function mostrarNegocios() {
    const feed = document.getElementById('feed-negocios');
    feed.innerHTML = negocios.map(n => `
        <div class="card">
            <h4>${n.nombre}</h4>
            <p>${n.dir}</p>
        </div>
    `).join('');
}

function registrar(nuevoNegocio) {
    negocios.push(nuevoNegocio);
    localStorage.setItem('pinol_db', JSON.stringify(negocios)); // Aquí se guarda en el teléfono
    mostrarNegocios();
}
