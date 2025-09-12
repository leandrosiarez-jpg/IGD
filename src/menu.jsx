import React, { useState, useEffect } from "react";
import { Spinner, Row } from "react-bootstrap";
import { getMenuItems } from "./services/menuService";
import MenuItem from "./components/MenuItem";
import MenuControls from "./components/MenuControls";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animating, setAnimating] = useState(false); // Nuevo estado para la animación

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getMenuItems();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Función para manejar el cambio de página con animación
  const handlePageChange = (newPage) => {
    if (animating) return; // Evita cambios rápidos mientras se anima

    setAnimating(true); // Inicia la animación de salida
    setTimeout(() => {
      setCurrentPage(newPage); // Cambia la página después de que la animación de salida empiece
      setAnimating(false); // Termina la animación (la de entrada se maneja en el CSS)
    }, 300); // Duración de la animación de desvanecimiento (0.3s)
  };

  const nextPage = () => {
    const newPage = (currentPage + 1) % totalPages;
    handlePageChange(newPage);
  };

  const prevPage = () => {
    const newPage = (currentPage - 1 + totalPages) % totalPages;
    handlePageChange(newPage);
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
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          minHeight: "600px", // Mantener una altura mínima para evitar saltos
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Empuja los botones abajo
        }}
      >
        <div
          className={`menu-page-transition ${animating ? "fade-out" : "fade-in"}`}
          style={{ width: "100%" }}
        >
          <Row xs={1} md={2} className="g-4">
            {currentItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </Row>
        </div>

        {/* Los controles ahora son parte del contenedor de página */}
        <MenuControls
          totalPages={totalPages}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
};

export default Menu;