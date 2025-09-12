// src/components/MenuControls.jsx
import React from "react";
import { Button } from "react-bootstrap";

const MenuControls = ({ totalPages, currentPage, nextPage, prevPage }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-4 d-flex justify-content-center gap-3">
      <Button variant="outline-secondary" size="lg" onClick={prevPage}>
        ◀
      </Button>
      <Button variant="secondary" size="lg" onClick={nextPage}>
        ▶
      </Button>
    </div>
  );
};

export default MenuControls;