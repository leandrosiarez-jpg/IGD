import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const items = [
  { id: 1, nombre: "Pizza Margarita", precio: "$10", img: "https://picsum.photos/300/200?pizza" },
  { id: 2, nombre: "Hamburguesa", precio: "$12", img: "https://picsum.photos/300/200?burger" },
  { id: 3, nombre: "Ensalada César", precio: "$8", img: "https://picsum.photos/300/200?salad" },
  { id: 4, nombre: "Pasta Boloñesa", precio: "$11", img: "https://picsum.photos/300/200?pasta" },
];

function Menu() {
  const [index, setIndex] = useState(0);

  const siguiente = () => setIndex((prev) => (prev + 1) % items.length);
  const anterior = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="d-flex flex-column align-items-center mt-4 px-3">
      <Card style={{ width: "100%", maxWidth: "22rem" }} className="shadow-lg rounded-4">
        <Card.Img
          variant="top"
          src={items[index].img}
          className="rounded-top-4"
          alt={items[index].nombre}
        />
        <Card.Body className="text-center">
          <Card.Title className="fw-bold fs-4">{items[index].nombre}</Card.Title>
          <Card.Text className="text-muted fs-5">{items[index].precio}</Card.Text>
        </Card.Body>
      </Card>

      <div className="mt-4 d-flex gap-3">
        <Button variant="outline-dark" size="lg" onClick={anterior}>
          ◀
        </Button>
        <Button variant="dark" size="lg" onClick={siguiente}>
          ▶
        </Button>
      </div>
    </div>
  );
}

export default Menu;
