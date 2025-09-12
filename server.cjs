// server.cjs
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Permite que el frontend (que corre en un puerto diferente) pueda hacer peticiones.
app.use(cors());

// Datos del menú con más ítems.
const menuItems = [
    { id: 1, nombre: "Pizza Margarita", precio: "$10", img: "https://picsum.photos/300/200?pizza" },
    { id: 2, nombre: "Hamburguesa", precio: "$12", img: "https://picsum.photos/300/200?burger" },
    { id: 3, nombre: "Ensalada César", precio: "$8", img: "https://picsum.photos/300/200?salad" },
    { id: 4, nombre: "Pasta Boloñesa", precio: "$11", img: "https://picsum.photos/300/200?pasta" },
    { id: 5, nombre: "Tacos de pescado", precio: "$14", img: "https://picsum.photos/300/200?tacos" },
    { id: 6, nombre: "Sushi Roll", precio: "$18", img: "https://picsum.photos/300/200?sushi" },
    { id: 7, nombre: "Filete de salmón", precio: "$20", img: "https://picsum.photos/300/200?salmon" },
    { id: 8, nombre: "Sopa de tomate", precio: "$6", img: "https://picsum.photos/300/200?soup" },
    { id: 9, nombre: "Cheesecake", precio: "$7", img: "https://picsum.photos/300/200?cheesecake" },
    { id: 10, nombre: "Tiramisú", precio: "$9", img: "https://picsum.photos/300/200?tiramisu" },
];

// Endpoint de la API que devuelve los elementos del menú.
app.get('/api/menu', (req, res) => {
    res.json(menuItems);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor de backend corriendo en http://localhost:${port}`);
});