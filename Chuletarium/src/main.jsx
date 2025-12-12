//FLUJO MENTAL
  // 1- index.html tiene <div id="root"></div>
  // 2- main.jsx encuentra ese div y mete dentro <App />
  // 3- App devuelve <Home />
  // 4- Home devuelve <Header />, <Hero />, etc.

//---------------------------------------------------------------------------------------

// Importamos StrictMode desde React.
// StrictMode activa comprobaciones adicionales en desarrollo
// (no afecta al build final).
import { StrictMode } from "react";

// Importamos createRoot desde react-dom/client.
// Esta función se encarga de conectar React con el DOM (index.html).
import { createRoot } from "react-dom/client";

// Importamos los estilos globales de la aplicación.
// Al hacer este import, Vite procesa el CSS y lo aplica a toda la app.
import "./styles/main.css";

// Importamos el componente raíz de la aplicación: App.
// Es el "cerebro" desde el que colgarán todas las vistas y componentes.
import App from "./App.jsx";

// Buscamos en el HTML el elemento con id "root"
// (definido en index.html) y creamos una "raíz" de React
// dentro de ese elemento.
createRoot(document.getElementById("root")).render(
  // StrictMode envuelve la App para hacer comprobaciones extra en desarrollo.
  <StrictMode>
    {/* Aquí montamos el componente App dentro del div#root */}
    <App />
  </StrictMode>
);

