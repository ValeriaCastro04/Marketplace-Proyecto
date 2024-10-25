// admin-panel.js
class AdminPanel {
    constructor() {
        this.productosEnEspera = [];
        this.inicializar();
    }

    async inicializar() {
        await this.cargarProductosPendientes();
        this.mostrarProductosPendientes();
    }

    async cargarProductosPendientes() {
        // Implementar carga de productos pendientes
    }

    mostrarProductosPendientes() {
        const contenedor = document.querySelector('#productos-pendientes');
        contenedor.innerHTML = this.productosEnEspera.map(producto => `
            <div class="producto-pendiente">
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.descripcion}</p>
                <button onclick="admin.aprobarProducto('${producto.id}')">Aprobar</button>
                <button onclick="admin.rechazarProducto('${producto.id}')"> Rechazar</button>
            </div>
        `).join('');
    }

    async aprobarProducto(id) {
        try {
            await this.actualizarEstadoProducto(id, 'aprobado');
            alert('Producto aprobado');
            await this.cargarProductosPendientes();
            this.mostrarProductosPendientes();
        } catch (error) {
            alert('Error al aprobar el producto');
        }
    }

    async rechazarProducto(id, motivo) {
        try {
            await this.actualizarEstadoProducto(id, 'rechazado', motivo);
            alert('Producto rechazado');
            await this.cargarProductosPendientes();
            this.mostrarProductosPendientes();
        } catch (error) {
            alert('Error al rechazar el producto');
        }
    }
}

const admin = new AdminPanel();