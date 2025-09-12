import React, { useState, useEffect } from "react";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de que Bootstrap CSS esté importado

const Menu = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 4;

  useEffect(() => {
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

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

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
    return <div className="text-center mt-5">No hay ítems en el menú.</div>;
  }

  return (
    <div
      className="d-flex flex-column align-items-center p-4"
      style={{
        backgroundColor: "#e9ecef",
        minHeight: "100vh",
        transition: "background-color 0.5s ease-in-out",
      }}
    >
      <h1 className="text-center mb-4">Menú Digital</h1>
      <div className="d-flex flex-column align-items-center w-100" style={{ maxWidth: "600px" }}>
        <div style={{ padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", minHeight: "600px" }}>
          <Row xs={1} md={2} className="g-4">
            {currentItems.map((item) => (
              <Col key={item.id}>
                <Card className="shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={item.img}
                    alt={item.nombre}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="fw-bold fs-5">{item.nombre}</Card.Title>
                      <Card.Text className="text-muted fs-6">{item.precio}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        
        {/* Botones de navegación integrados debajo de los bloques */}
        {totalPages > 1 && (
          <div className="mt-4 d-flex justify-content-center gap-3">
            <Button variant="outline-secondary" size="lg" onClick={prevPage}>
              ◀
            </Button>
            <Button variant="secondary" size="lg" onClick={nextPage}>
              ▶
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;