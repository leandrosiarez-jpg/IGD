import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />  {/* App se llama aquí */}
  </React.StrictMode>
);
