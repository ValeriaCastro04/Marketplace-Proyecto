const express = require('express');
const mysql = require('mysql');

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',   
    user: 'root',
    password: 'root',
    database: 'marketplace'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

app.listen(3007, () => console.log('Servidor corriendo en el puerto 3007'));

app.get('/api/datos', (req, res) => {
    connection.query('SELECT * FROM tabla', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

fetch('http://localhost:3007/api/datos')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Aquí puedes trabajar con los datos recibidos
    })
    .catch(error => console.error('Error:', error));

