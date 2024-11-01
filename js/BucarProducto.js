// busqueda-carrito.js
class TiendaOnline {
    constructor() {
        this.carrito = [];
        this.inicializarBuscador();
        this.inicializarCarrito();
    }

    async obtenerResultados(termino) {
        const productosRef = collection(db, 'productosAprobados');
        const querySnapshot = await getDocs(productosRef);
        return querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(producto => 
                producto.nombre.toLowerCase().includes(termino.toLowerCase()) ||
                producto.descripcion.toLowerCase().includes(termino.toLowerCase())
            );
    }
    
    mostrarResultados(resultados) {
        const resultadosContainer = document.getElementById('resultados-busqueda');
        resultadosContainer.innerHTML = resultados.map(producto => `
            <div class="producto">
                <h4>${producto.nombre}</h4>
                <p>${producto.descripcion}</p>
                <span>$${producto.precio}</span>
                <button onclick="tienda.agregarAlCarrito(${JSON.stringify(producto)})">Agregar al Carrito</button>
            </div>
        `).join('');
    }    

    inicializarBuscador() {
        const buscador = document.createElement('input');
        buscador.type = 'search';
        buscador.placeholder = 'Buscar productos...';
        buscador.addEventListener('input', (e) => this.buscarProductos(e.target.value));
        document.querySelector('header').appendChild(buscador);
    }

    inicializarCarrito() {
        const carritoBtn = document.createElement('button');
        carritoBtn.innerHTML = '🛒 Carrito (0)';
        carritoBtn.addEventListener('click', () => this.mostrarCarrito());
        document.querySelector('header').appendChild(carritoBtn);
    }

    async buscarProductos(termino) {
        // Implementar búsqueda
        const resultados = await this.obtenerResultados(termino);
        this.mostrarResultados(resultados);
    }

    agregarAlCarrito(producto) {
        this.carrito.push(producto);
        this.actualizarCarrito();
    }

    mostrarCarrito() {
        const total = this.carrito.reduce((sum, item) => sum + parseFloat(item.precio), 0);
        const carritoHTML = `
            <div class="carrito-modal">
                <h2>Tu Carrito</h2>
                ${this.carrito.map(item => `
                    <div class="item-carrito">
                        <span>${item.nombre}</span>
                        <span>$${item.precio}</span>
                        <button onclick="tienda.eliminarDelCarrito('${item.id}')">Eliminar</button>
                    </div>
                `).join('')}
                <div class="total">Total: $${total}</div>
                <button onclick="tienda.procederAlPago()">Proceder al Pago</button>
            </div>
        `;
        // Mostrar modal
    }
}

const tienda = new TiendaOnline();