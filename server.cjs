const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Permite que el frontend (que corre en un puerto diferente) pueda hacer peticiones.
app.use(cors());

// Datos del menú (en un entorno real, esto vendría de una base de datos).
const menuItems = [
    { id: 1, nombre: "Pizza Margarita", precio: "$10", img: "https://picsum.photos/300/200?pizza" },
    { id: 2, nombre: "Hamburguesa", precio: "$12", img: "https://picsum.photos/300/200?burger" },
    { id: 3, nombre: "Ensalada César", precio: "$8", img: "https://picsum.photos/300/200?salad" },
    { id: 4, nombre: "Pasta Boloñesa", precio: "$11", img: "https://picsum.photos/300/200?pasta" },
];

// Endpoint de la API que devuelve los elementos del menú.
app.get('/api/menu', (req, res) => {
    res.json(menuItems);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor de backend corriendo en http://localhost:${port}`);
});