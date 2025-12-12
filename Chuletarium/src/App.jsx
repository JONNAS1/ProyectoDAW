// Importamos el componente "Home".
// Este componente representa la página de inicio de la aplicación.
import Home from "./views/Home";

// Definimos el componente principal de la app: App.
// En React, un componente es simplemente una función que devuelve JSX.
export default function App() {
  // Lo único que hace App por ahora es renderizar (mostrar) el componente Home.
  // Más adelante, aquí podríamos tener rutas, lógica de tema oscuro, etc.
  return <Home />;
}
