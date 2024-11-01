// proceso-pago.js
class ProcesadorPago {
    constructor() {
        this.form = document.getElementById('form_pago');
        this.inicializarFormulario();
    }

    inicializarFormulario() {
        this.form.addEventListener('submit', (e) => this.procesarPago(e));
    }

    async procesarPago(e) {
        e.preventDefault();
        const datosPago = {
            nombre: document.getElementById('nombre').value,
            tarjeta: document.getElementById('num_tarjeta').value,
            cvv: document.getElementById('cvv').value,
            expiracion: document.getElementById('expiracion').value
        };

        try {
            await this.validarPago(datosPago);
            await this.realizarPago(datosPago);
            this.enviarConfirmacion();
            window.location.href = 'confirmacion-compra.html';
        } catch (error) {
            alert('Error en el pago: ' + error.message);
        }
    }

    async validarPago(datos) {
        const tarjetaRegex = /^[0-9]{16}$/; // Tarjeta de 16 dígitos
        const cvvRegex = /^[0-9]{3,4}$/;    // CVV de 3 o 4 dígitos
        const expiracionRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY formato
    
        if (!tarjetaRegex.test(datos.tarjeta)) {
            throw new Error("Número de tarjeta inválido.");
        }
        if (!cvvRegex.test(datos.cvv)) {
            throw new Error("CVV inválido.");
        }
        if (!expiracionRegex.test(datos.expiracion)) {
            throw new Error("Fecha de expiración inválida. Use MM/YY.");
        }
    }
    

    async realizarPago(datos) {
        // Aquí iría la lógica para realizar el pago usando una API de proveedor externo
        // Por ejemplo, puedes usar Stripe.js o la API REST de Stripe para procesar el pago
        return new Promise((resolve, reject) => {
            // Simulación de la llamada a una API de pago
            setTimeout(() => {
                // Resuelve si el pago es exitoso o rechaza si hay un problema
                const isPagoExitoso = true; // Esto debería depender de la respuesta de la API de pago
                if (isPagoExitoso) resolve();
                else reject(new Error("El pago fue rechazado."));
            }, 2000);
        });
    }    

    async enviarConfirmacion() {
        // Aquí se podría integrar un servicio como Firebase Cloud Messaging o una API de correo electrónico
        alert("Confirmación de compra enviada a tu correo electrónico.");
    }
}

new ProcesadorPago();