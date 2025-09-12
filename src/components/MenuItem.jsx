// src/components/MenuItem.jsx
import React from "react";
import { Card, Col } from "react-bootstrap";

const MenuItem = ({ item }) => {
  return (
    <Col>
      <Card className="shadow-sm h-100">
        <Card.Img
          variant="top"
          src={item.img}
          alt={item.nombre}
          style={{ height: "60px", objectFit: "cover" }} // <--- ALTURA AJUSTADA AQUÍ
        />
        <Card.Body className="text-center d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="fw-bold fs-5">{item.nombre}</Card.Title>
            <Card.Text 
                className="text-center d-flex flex-column justify-content-between"
                
                >{item.precio}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MenuItem;