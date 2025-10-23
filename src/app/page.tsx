// ESTO ES LO QUE NECESITAS AÑADIR PARA SOLUCIONAR EL ERROR EN NEXT.JS
"use client"; 

import React from 'react';
// 1. IMPORTAR useNavigate
import { useNavigate } from 'react-router-dom';
// Nota: Si estás usando Next.js, a menudo se usa 'next/navigation' (ej. useRouter)
// en lugar de 'react-router-dom'. Asumiremos que estás en un entorno que aún usa 
// react-router-dom o que solo usas ese hook.

// =========================================================
// 1. CONSTANTES DE ESTILO BÁSICAS
// =========================================================

const COLORS = {
  primary: '#790563', 
  secondary: '#e5e7eb',
  dark: '#e505a2',
  light: '#f9fafb',
  accent: '#ff52a2',
};

// =========================================================
// 2. OBJETOS DE ESTILO EN LÍNEA
// =========================================================

const styles: { [key: string]: React.CSSProperties } = {
  // Estilos Generales
  body: { 
    fontFamily: 'sans-serif', 
    lineHeight: 1.6, 
    margin: 0, 
    padding: 0, 
    backgroundColor: COLORS.light 
  },
  contenedor: { maxWidth: '1100px', margin: '0 auto', padding: '0 20px' },
  seccion: { padding: '80px 0' },
  seccionClara: { padding: '80px 0', backgroundColor: COLORS.secondary },
  tituloH2: { fontSize: '2.5rem', marginBottom: '40px', color: COLORS.dark, textAlign: 'center' },

  // Presentación (Hero)
  presentacion: { 
    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`, 
    color: 'white', 
    padding: '100px 0', 
    textAlign: 'center' 
  },
  presentacionH1: { fontSize: '4rem', marginBottom: '10px' },
  presentacionP: { fontSize: '1.2rem', marginBottom: '40px' },

  // Botón: Aseguramos que sea un cursor de puntero
  button: {
    display: 'inline-block',
    background: COLORS.primary,
    color: 'white',
    padding: '15px 30px',
    borderRadius: '50px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textDecoration: 'none',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    border: 'none', // Importante para que el <button> se vea como el <a>
    cursor: 'pointer', // Indica que es clickeable
  },

  // Grupos de Cajas (Pasos/Beneficios) - Se omiten detalles, solo estructura
  gruposDeCajas: { display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' as 'wrap' },
  caja: { flex: '1 1 300px', padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)', textAlign: 'center' },
  iconoNumero: { fontSize: '3rem', color: COLORS.accent, marginBottom: '15px' },

  // Registro (Call to Action - CTA)
  registroContainer: { textAlign: 'center' },
  registroP: { fontSize: '1.2rem', marginBottom: '30px', color: '#555' },
};

// =========================================================
// 3. COMPONENTE PRINCIPAL
// =========================================================

const SwappifyLanding: React.FC = () => {
  // 2. Inicializar useNavigate
  // Esto ahora funciona gracias a la directiva "use client";
  const navigate = useNavigate();

  // 3. Función de navegación
  const handleNavigateToLogin = () => {
    // Redirige a la ruta '/login'
    navigate('/login');
  };

  return (
    <div style={styles.body}>

      {/* 4. SECCIÓN DE PRESENTACIÓN (HERO) */}
      <div style={styles.presentacion}>
        <div style={styles.contenedor}>
          <h1 style={styles.presentacionH1}>SWAPPIFY</h1>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Intercambia objetos de forma justa y segura.</h3>
          <p style={styles.presentacionP}>Valora tus pertenencias y cámbialas por lo que realmente necesitas.</p>
          
          {/* BOTÓN 1 MODIFICADO */}
          <button 
            onClick={handleNavigateToLogin} 
            style={styles.button as React.CSSProperties}
          >
            ¡Empieza a intercambiar!
          </button>
        </div>
      </div>

      <main>
        {/* SECCIÓN CÓMO FUNCIONA - EJEMPLO DE USO DEL ESTILO DE CAJAS */}
        <section id="como-funciona" style={styles.seccion}>
          <div style={styles.contenedor}>
            <h2 style={styles.tituloH2}>¿Cómo funciona?</h2>
            <div style={styles.gruposDeCajas}>
              <div style={styles.caja}>
                <div style={styles.iconoNumero}>1</div>
                <h3>Publica</h3>
                <p>Sube fotos y descripciones de lo que quieres intercambiar.</p>
              </div>
              <div style={styles.caja}>
                <div style={styles.iconoNumero}>2</div>
                <h3>Valora</h3>
                <p>Nuestro sistema te ayuda a asignar un valor justo a tu objeto.</p>
              </div>
              <div style={styles.caja}>
                <div style={styles.iconoNumero}>3</div>
                <h3>Intercambia</h3>
                <p>Encuentra coincidencias y acepta el trueque.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN BENEFICIOS */}
        <section id="beneficios" style={styles.seccionClara}>
          <div style={styles.contenedor}>
             <h2 style={styles.tituloH2}>Beneficios</h2>
             {/* ... contenido ... */}
          </div>
        </section>

        {/* 7. SECCIÓN DE REGISTRO (CTA) */}
        <section id="registro" style={styles.seccion}>
          <div style={{ ...styles.contenedor, ...styles.registroContainer }}>
            <h2 style={styles.tituloH2}>¿Listo para empezar?</h2>
            <p style={styles.registroP}>Únete a nuestra comunidad y truequeA.</p>
            
            {/* BOTÓN 2 MODIFICADO */}
            <button 
              onClick={handleNavigateToLogin}
              style={{ 
                ...styles.button, 
                padding: '20px 40px', 
                fontSize: '1.2rem',
                color: 'white'
              } as React.CSSProperties}
            >
              Regístrate ahora
            </button>
          </div>
        </section>
      </main>
      
      {/* 8. FOOTER */}
      <footer>
        <div style={{ ...styles.contenedor, textAlign: 'center', padding: '30px 0', borderTop: `1px solid ${COLORS.secondary}`, color: '#777' }}>
          <p>&copy; 2025 SWAPPIFY. Todos los derechos reservados.</p>
        </div>
    </footer>
    </div>
  );
};

export default SwappifyLanding;