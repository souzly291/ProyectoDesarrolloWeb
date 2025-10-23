'use client';
import React, { useState, FormEvent } from 'react';
// Asegúrate de que esta ruta sea correcta para tu proyecto
import { postRegister } from './servicies/registerService'; 

// Define la estructura de los datos del formulario que se enviarán al backend.
interface RegistrationData {
  first_name: string;
  last_name_f: string;
  last_name_m: string;
  birth_date: string; // Usar formato 'YYYY-MM-DD'
  email: string;
  password_hash: string; // Se enviará la contraseña para que el backend la hashee
  phone: string;
}

// Adaptamos el nombre de la función de 'RegisterForm' a 'page'
// para que funcione como una página en Next.js.
const page: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    first_name: '',
    last_name_f: '',
    last_name_m: '',
    birth_date: '',
    email: '',
    password_hash: '',
    phone: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Iniciar la carga

    // Validación simple en el frontend
    if (formData.password_hash.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      setLoading(false);
      return;
    }

    try {
      // 💡 Reemplazamos el 'fetch' del código original por 'postRegister'
      // que es lo que hace el código de destino.
      const response = await postRegister(formData);

      // Asumiendo que 'postRegister' devuelve el resultado del registro
      // o lanza un error si la solicitud no es exitosa.
      // Adaptamos el manejo de respuesta a cómo se comporta tu 'postRegister'.
      // Si postRegister lanza una excepción en caso de error, el 'catch' se encargará.
      
      setSuccess('¡Registro exitoso! Por favor, inicia sesión.');
      console.log('Registro exitoso:', response);

      // Limpiar formulario
      setFormData({
        first_name: '',
        last_name_f: '',
        last_name_m: '',
        birth_date: '',
        email: '',
        password_hash: '',
        phone: '',
      });
      
    } catch (err: any) {
      // Asume que 'err' podría tener una propiedad 'message' si es un error de la API
      // o un error genérico de la conexión.
      const errorMessage = err.message || 'Error en el registro. Inténtalo de nuevo.';
      setError(errorMessage);
      console.error('Error durante el registro:', err);
    } finally {
        setLoading(false); // Finalizar la carga
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Registro de Cliente</h2>
      <p style={{marginBottom: '20px'}}>Este es el registro</p> {/* Agregamos el texto 'Este es el registro' */}
      <form onSubmit={handleSubmit}>
        {/* Primer Nombre */}
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="first_name">Primer Nombre:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
          />
        </div>

        {/* Apellido Paterno */}
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="last_name_f">Apellido Paterno:</label>
          <input
            type="text"
            id="last_name_f"
            name="last_name_f"
            value={formData.last_name_f}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
          />
        </div>

        {/* Apellido Materno */}
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="last_name_m">Apellido Materno:</label>
          <input
            type="text"
            id="last_name_m"
            name="last_name_m"
            value={formData.last_name_m}
            onChange={handleChange}
            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
          />
        </div>

        {/* Fecha de Nacimiento */}
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="birth_date">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
          />
        </div>

        {/* Email */}
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
          />
        </div>

        {/* Contraseña */}
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="password_hash">Contraseña:</label>
          <input
            type="password"
            id="password_hash"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
            required
            minLength={8}
            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
          />
        </div>

        {/* Celular */}
        <div style={{marginBottom: '10px'}}>
          <label htmlFor="phone">Celular:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
          />
        </div>

        {/* Mensajes de Estado */}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}

        {/* Botón de Envío */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            marginTop: '15px', 
            padding: '10px 15px', 
            backgroundColor: loading ? '#ccc' : '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default page;