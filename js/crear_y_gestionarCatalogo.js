// gestion-catalogo.js
class ProductoCatalogo {
    constructor() {
        this.productos = [];
        this.inicializar();
    }

    inicializar() {
        const formProducto = document.querySelector('#formulario-producto form');
        if (formProducto) {
            formProducto.addEventListener('submit', (e) => this.agregarProducto(e));
        }

        this.cargarProductos();
    }

    async agregarProducto(e) {
        e.preventDefault();

        const producto = {
            nombre: document.getElementById('nombre_producto').value,
            descripcion: document.getElementById('descripcion_producto').value,
            precio: document.getElementById('precio_producto').value,
            categoria: document.getElementById('categoria_producto').value,
            imagen: document.getElementById('imagen_producto').files[0]
        };

        try {
            await this.guardarProducto(producto);
            alert('Producto agregado exitosamente');
            this.cargarProductos();
        } catch (error) {
            alert('Error al agregar el producto');
        }
    }

    async cargarProductos() {
        const catalogoContainer = document.getElementById('catalogo-productos');
        // Aquí iría la lógica para cargar productos desde la base de datos
    }
}

const catalogo = new ProductoCatalogo();