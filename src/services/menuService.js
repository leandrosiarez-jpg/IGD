// src/services/menuService.js
export const getMenuItems = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/menu");
    if (!response.ok) {
      throw new Error("Error al cargar el menú.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};