document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario

    // Obtiene los valores de los campos de entrada
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    // Credenciales válidas (ajusta estos valores según tus requerimientos)
    const validEmail = "Agile@esen.edu.sv";
    const validPassword = "123456"; // Reemplaza esto con la contraseña válida

    // Validación de las credenciales
    if (correo === validEmail && contrasena === validPassword) {
        window.location.href = 'admin.html'; // Redirige a admin.html
    } else {
        alert('Credenciales inválidas. Por favor, intenta de nuevo.'); // Muestra un mensaje de error
    }
});
