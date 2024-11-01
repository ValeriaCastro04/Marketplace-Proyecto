import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

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
        // Crea el usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, datos.correo, datos.password);
        const user = userCredential.user;

        // Guarda información adicional en Firestore
        await addDoc(collection(db, 'vendedores'), {
            uid: user.uid,
            nombre: datos.nombre,
            telefono: datos.telefono,
            correo: datos.correo
        });
    }
}

new RegistroVendedor();