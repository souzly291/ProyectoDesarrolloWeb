// AppRouter.tsx

import React from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

// 1. Componente SwappifyLanding (Ruta: ./page)
import SwappifyLanding from './page'; // Ajustada la ruta si AppRouter está en /router
                                      // Usa './page' si AppRouter y page.tsx están en el mismo nivel

// 2. Componente LoginSwappify (Ruta CORREGIDA: ./app/login/page)
import LoginSwappify from './login/page'; // Ajustada la ruta si AppRouter está en /router
                                             // Usa './app/login/page' si AppRouter está en el mismo nivel que /app

const AppRouter = () => { 
  return (
    <Routes>
      <Route path="/page" element={<SwappifyLanding />} />
      <Route path="/login/page" element={<LoginSwappify />} />
      <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '50px'}}>404 | Página no encontrada 😔</h1>} />
    </Routes>
  );
};

export default AppRouter;
