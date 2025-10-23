import React from 'react';
// Importa los tipos para los componentes funcionales de React

/**
 * Componente funcional que representa la página de inicio
 * después de que un usuario ha iniciado sesión.
 *
 * @returns El elemento React que muestra el mensaje de sesión iniciada.
 */
const Dashboard: React.FC = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Un encabezado de nivel 1 (h1) para el mensaje principal. 
        Lo ponemos en negrita para que destaque.
      */}
      <h1>🎉 ¡Ya iniciaste sesión!</h1>

      {/* Un párrafo (p) que podría contener información adicional 
        o un enlace para ir al contenido principal.
      */}
      <p>
        Bienvenido/a a tu panel de control. Ahora tienes acceso a todas las funcionalidades.
      </p>

      {/*  */}
    </div>
  );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default Dashboard;