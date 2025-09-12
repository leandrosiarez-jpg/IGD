import React, { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Aquí es donde se conecta al backend para obtener los datos del menú.
    fetch("http://localhost:3001/api/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar el menú.");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const siguiente = () => setIndex((prev) => (prev + 1) % items.length);
  const anterior = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>Error: {error}</p>
        <p>Asegúrate de que el servidor está corriendo en el puerto 3001.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-center mt-5">No hay items en el menú.</div>;
  }

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
};

export default Menu;