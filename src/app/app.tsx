// src/App.tsx

import React from 'react';
// Importamos los componentes necesarios de React Router
import { BrowserRouter } from 'react-router-dom';

// Importamos el archivo de rutas. 
// ASUMIENDO que el archivo está en src/router/Router.tsx, la ruta de importación es:
import AppRouter from './AppRouter'; 

const App: React.FC = () => {
  return (
    // ESTE ES EL LUGAR: BrowserRouter envuelve toda la lógica de rutas.
    <BrowserRouter>
      {/* AppRouter contiene todas tus <Routes> y <Route> 
          y será el que cambie el contenido que se muestra. 
      */}
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;