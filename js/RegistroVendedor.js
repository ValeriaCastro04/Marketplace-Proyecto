// registro-vendedor.js
class RegistroVendedor {
    constructor() {
        this.form = document.querySelector('form');
        this.inicializarEventos();
    }

    inicializarEventos() {
        this.form.addEventListener('submit', (e) => this.manejarRegistro(e));
    }

    async manejarRegistro(e) {
        e.preventDefault();

        const datosVendedor = {
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            correo: document.getElementById('correo').value,
            password: document.getElementById('password').value
        };

        if (this.validarDatos(datosVendedor)) {
            try {
                await this.registrarVendedor(datosVendedor);
                alert('Registro exitoso');
                window.location.href = 'Log-in-Vendedor.html';
            } catch (error) {
                alert('Error en el registro: ' + error.message);
            }
        }
    }

    validarDatos(datos) {
        if (!/^[a-zA-Z\s]+$/.test(datos.nombre)) {
            alert('El nombre solo debe contener letras');
            return false;
        }
        if (!/^\d{4}-\d{4}$/.test(datos.telefono)) {
            alert('Formato de teléfono inválido');
            return false;
        }
        return true;
    }

    async registrarVendedor(datos) {
        // Aquí iría la lógica de conexión con el backend
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
}

new RegistroVendedor();