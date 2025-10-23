"use client"; // <-- ¡CRUCIAL! Esto resuelve el error de Event Handlers
import React from 'react';

// =========================================================
// 1. CONSTANTES DE COLOR Y ESTILOS (Simulando :root y CSS)
// =========================================================

const COLORS = {
  primary: '#fa09de', // Color principal (botón, enlaces)
  dark: '#1f2937',    // Color oscuro (texto, títulos)
  light: '#f0d4ea',   // Color de fondo de la página
  inputBg: '#e5e7eb', // Fondo de los campos de entrada
  formBg: 'rgb(228, 157, 220)', // Fondo del contenedor de login
  shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

// Objeto de estilos en línea
const styles: { [key: string]: React.CSSProperties } = {
  // Estilo 'body' aplicado al contenedor principal
  bodyContainer: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: COLORS.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Usamos minHeight en React para mejor compatibilidad
    width: '100%',
    // Reset básico de margin/padding
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  contenedorLogin: {
    background: COLORS.formBg,
    padding: '40px',
    borderRadius: '10px',
    boxShadow: COLORS.shadow,
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
  },

  tituloH2: {
    marginBottom: '25px',
    color: COLORS.dark,
    fontSize: '1.8rem',
  },

  formPartecita: {
    textAlign: 'left',
    marginBottom: '20px',
  },

  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: COLORS.dark,
  },

  input: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    background: COLORS.inputBg,
    fontSize: '1rem',
    color: COLORS.dark,
    // Nota: El estilo :focus se maneja con el atributo onFocus/onBlur en React,
    // pero para simplicidad, aquí solo definimos el estilo base.
  },

  submitBtn: {
    width: '100%',
    padding: '15px',
    background: COLORS.primary,
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    // Nota: El :hover se maneja con el estado o un componente de estilo.
    // Aquí solo definimos el estilo base.
  },

  signupLink: {
    marginTop: '20px',
    fontSize: '0.9rem',
    color: COLORS.dark,
  },

  signupLinkAnchor: {
    color: COLORS.primary,
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};

// =========================================================
// 2. COMPONENTE PRINCIPAL
// =========================================================

const LoginSwappify: React.FC = () => {
  // Manejador simple para simular la lógica del formulario (opcional)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Intento de iniciar sesión...');
    // Aquí iría la lógica de autenticación
  };

  return (
    // Contenedor que simula el <body> con centrado
    <div style={styles.bodyContainer}>

      <div className="contenedor-login" style={styles.contenedorLogin}>
        <h2 style={styles.tituloH2}>Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          
          {/* Campo de Correo Electrónico */}
          <div className="form-partecita" style={styles.formPartecita}>
            <label htmlFor="login-email" style={styles.label}>Correo electrónico</label>
            <input 
              type="email" 
              id="login-email" 
              name="email" 
              required 
              style={styles.input}
            />
          </div>
          
          {/* Campo de Contraseña */}
          <div className="form-partecita" style={styles.formPartecita}>
            <label htmlFor="login-password" style={styles.label}>Contraseña</label>
            <input 
              type="password" 
              id="login-password" 
              name="password" 
              required 
              style={styles.input}
            />
          </div>
          
          <button type="submit" style={styles.submitBtn}>
            Entrar
          </button>
        </form>
        
        <p className="signup-link" style={styles.signupLink}>
          ¿No tienes cuenta? 
          <a href="#" style={styles.signupLinkAnchor}>Regístrate aquí</a>
        </p>
      </div>

    </div>
  );
};

export default LoginSwappify;