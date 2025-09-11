// src/components/Menu.jsx

import React from 'react';

// Datos de ejemplo
const menuItems = [
  { id: 1, name: "Pizza Margarita", description: "Salsa de tomate, mozzarella, albahaca fresca.", price: 12.50 },
  { id: 2, name: "Hamburguesa Clásica", description: "Carne, lechuga, tomate, cebolla, pepinillos.", price: 9.75 },
  { id: 3, name: "Ensalada César", description: "Lechuga romana, crutones, queso parmesano, aderezo César.", price: 8.00 },
];

function Menu() {
  return (
    <section className="menu-container">
      {menuItems.map((item) => (
        <div key={item.id} className="menu-item">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <span>${item.price}</span>
        </div>
      ))}
    </section>
  );
}

export default Menu;