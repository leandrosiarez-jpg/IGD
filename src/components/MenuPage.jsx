// src/components/MenuPage.jsx
import React from "react";
import { Row } from "react-bootstrap";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";

const variants = {
  enter: (direction) => ({
    x: direction === "forward" ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === "forward" ? "-100%" : "100%",
    opacity: 0,
  }),
};

const MenuPage = ({ items, onDragEnd, direction }) => {
  return (
    <motion.div
      key={direction} // La key se usa para disparar la animación
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      style={{ position: "absolute", width: "100%", height: "100%", top: "0%", left: "0%" }}
    >
      <div className="d-flex flex-column justify-content-between h-100">
        <div>
          <Row xs={1} md={2} className="g-4">
            {items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </Row>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuPage;    