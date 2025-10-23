'use client'; // Usamos 'use client' porque es un formulario interactivo

import React, { FormEvent, useRef } from 'react';

// Estilos básicos en línea que simulan el archivo 'login.css'
const styles: { [key: string]: React.CSSProperties } = {
  contenedorLogin: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  formPartecita: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  submitBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  signupLink: {
    marginTop: '20px',
    fontSize: '14px',
  },
};

export default function LoginPage() {
  // Usamos useRef para acceder a los valores del formulario al enviar
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Función de manejo del envío del formulario (simulada)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Obtener los valores usando useRef
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    console.log('Intento de inicio de sesión con:', { email, password });
    
    // Aquí iría tu lógica para enviar los valores al servicio de Supabase
    // (Paso 3 y 4 de tu anterior pregunta)
    alert(`Iniciando sesión con Email: ${email}`); 
  };

  return (
    <div style={styles.contenedorLogin}>
      <h2>Iniciar Sesión en SWAPPIFY</h2>
      
      {/* El atributo 'id' se convierte en 'id' y 'class' en 'className' */}
      <form onSubmit={handleSubmit} className="form">
        
        <div style={styles.formPartecita}>
          {/* El atributo 'for' se convierte en 'htmlFor' */}
          <label htmlFor="login-email" style={styles.label}>
            Correo electrónico
          </label>
          <input 
            type="email" 
            id="login-email" 
            name="email" 
            ref={emailRef} // Vinculación con useRef
            required 
            style={styles.input} 
          />
        </div>
        
        <div style={styles.formPartecita}>
          <label htmlFor="login-password" style={styles.label}>
            Contraseña
          </label>
          <input 
            type="password" 
            id="login-password" 
            name="password" 
            ref={passwordRef} // Vinculación con useRef
            required 
            style={styles.input} 
          />
        </div>
        
        <button type="submit" className="submit-btn" style={styles.submitBtn}>
          Entrar
        </button>
        
        <p className="signup-link" style={styles.signupLink}>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}