// Función para mostrar el campo de motivo de rechazo
function mostrarCampoMotivo(id) {
    document.getElementById(`motivo-${id}`).style.display = 'block';
}

// Clase para la lógica del panel administrativo
class AdminPanel {
    constructor() {
        this.productosEnEspera = [
            {
                id: '1',
                nombre: 'Moto Sport 2022',
                descripcion: 'La Moto Sport 2022 es la combinación perfecta de estilo y rendimiento.',
                precio: '$5,500.00',
                categoria: 'Electrónica',
                imagen: 'https://th.bing.com/th/id/OIP.HwY40bDVIvkPFz8fPfKzpAHaFy?rs=1&pid=ImgDetMain'
            },
            {
                id: '2',
                nombre: 'Sillón Relax Elegante',
                descripcion: 'El Sillón Relax Elegante es la adición perfecta para cualquier sala de estar.',
                precio: '$250.00',
                categoria: 'Muebles',
                imagen: 'https://m.media-amazon.com/images/I/51kRH2mCj5L._AC_SL1200_.jpg'
            }
        ];
        this.productosAprobados = [];
        this.productosRechazados = [];
        this.inicializar();
    }

    async cargarProductosEnEspera() {
        const productosSnapshot = await getDocs(collection(db, 'productosEnEspera'));
        this.productosEnEspera = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }    

    async inicializar() {
        await this.cargarProductosEnEspera();
        this.mostrarProductos();
    }    

    mostrarProductos() {
        this.actualizarLista('lista-espera', this.productosEnEspera, 'en-espera');
        this.actualizarLista('lista-aprobados', this.productosAprobados, 'aprobados');
        this.actualizarLista('lista-rechazados', this.productosRechazados, 'rechazados');
    }

    actualizarLista(elementoID, listaProductos, tipo) {
        const contenedor = document.getElementById(elementoID);
        contenedor.innerHTML = listaProductos.map(producto => `
            <div class="producto">
                <h4>Nombre del Producto:</h4>
                <p>${producto.nombre}</p>
                <h4>Descripción:</h4>
                <p>${producto.descripcion}</p>
                <h4>Precio (USD):</h4>
                <p>${producto.precio}</p>
                <h4>Categoría:</h4>
                <p>${producto.categoria}</p>
                <h4>Imagen del Producto:</h4>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                ${tipo === 'en-espera' ? `
                <button class="aprobar" onclick="admin.aprobarProducto('${producto.id}')">Aprobar</button>
                <button class="rechazar" onclick="mostrarCampoMotivo('${producto.id}')">Rechazar</button>
                <div id="motivo-${producto.id}" class="motivo-container" style="display:none;">
                    <textarea placeholder="Escribe el motivo del rechazo" id="nota-${producto.id}" class="nota"></textarea>
                    <button onclick="admin.rechazarProducto('${producto.id}', document.getElementById('nota-${producto.id}').value)">Enviar motivo</button>
                </div>
                ` : ''}
                ${tipo === 'rechazados' && producto.motivoRechazo ? `
                <h4>Motivo del Rechazo:</h4>
                <p>${producto.motivoRechazo}</p>
                ` : ''}
            </div>
        `).join('');
    }

    async aprobarProducto(id) {
        const producto = this.productosEnEspera.find(p => p.id === id);
        if (producto) {
            await addDoc(collection(db, 'productosAprobados'), producto);
            await deleteDoc(doc(db, 'productosEnEspera', id));
            this.productosAprobados.push(producto);
            this.productosEnEspera = this.productosEnEspera.filter(p => p.id !== id);
            this.mostrarProductos();
            alert('Producto aprobado');
        }
    }    

    async rechazarProducto(id, motivo) {
        if (!motivo) {
            alert('Por favor, ingresa un motivo para rechazar el producto.');
            return;
        }
        const producto = this.productosEnEspera.find(p => p.id === id);
        if (producto) {
            producto.motivoRechazo = motivo;
            await addDoc(collection(db, 'productosRechazados'), producto);
            await deleteDoc(doc(db, 'productosEnEspera', id));
            this.productosRechazados.push(producto);
            this.productosEnEspera = this.productosEnEspera.filter(p => p.id !== id);
            this.mostrarProductos();
            alert('Producto rechazado');
        }
    }    
}

// Inicializa la instancia del panel de administración
const admin = new AdminPanel();
