import React, { useState, useEffect } from "react";
import { Spinner, Row } from "react-bootstrap";
import { getMenuItems } from "./services/menuService";
import MenuItem from "./components/MenuItem";
import { motion, AnimatePresence } from "framer-motion";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDragEnd = (event, info) => {
    const dragThreshold = 100; // Pixels to trigger a page change
    const dragDirection = info.offset.x;

    if (dragDirection > dragThreshold) {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    } else if (dragDirection < -dragThreshold) {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
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
  
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

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
          minHeight: "600px",
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentPage}
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={{ position: "absolute", width: "100%", height: "100%", top: "0%", left: "0%" }}
          >
            <div className="d-flex flex-column justify-content-between h-100">
                <div>
                  <Row xs={1} md={2} className="g-4">
                    {currentItems.map((item) => (
                      <MenuItem key={item.id} item={item} />
                    ))}
                  </Row>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;