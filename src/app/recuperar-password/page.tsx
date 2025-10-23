"use client";
import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';

// Tipos de estado: Cambiamos 'enviado' por 'verificacion' y 'exito'
type FormState = 'solicitud' | 'verificacion' | 'exito' | 'error';

// --- Styled Components (Se asume que los tienes definidos o usarás estos) ---
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const FormWrapper = styled.form`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  // Usamos 'div' para el renderizado final (éxito)
  &.as-div {
    display: block;
  }
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  color: #666;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background-color: #005bb5;
  }

  &:disabled {
    background-color: #a0c3f7;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ $isError?: boolean; $isSuccess?: boolean }>`
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;

  ${props => props.$isError && `
    background-color: #fdd;
    color: #c00;
  `}

  ${props => props.$isSuccess && `
    background-color: #dfd;
    color: #0c0;
  `}
`;


// --- Componente Principal ---

const RecuperacionContrasena: React.FC = () => {
    // AÑADIDO: Estado para la fecha de nacimiento
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    // AÑADIDO: Estados para la nueva contraseña y el token
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationToken, setVerificationToken] = useState(''); 

    const [formState, setFormState] = useState<FormState>('solicitud');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // ---------------------------------------------
    // 1. MANEJADOR: Verificación de Identidad (Paso 1)
    // ---------------------------------------------
    const handleSolicitudSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        try {
            // Llama a la API que verifica email y birth_date en la DB
            const response = await fetch('/api/recover/verify-identity', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Enviamos ambos datos al backend para la verificación en Supabase
                body: JSON.stringify({ email, birth_date: birthDate }), 
            });

            const data = await response.json();
            setIsLoading(false);

            if (response.ok && data.ok && data.verificationToken) {
                // Guarda el token temporal y pasa al formulario de restablecimiento
                setVerificationToken(data.verificationToken); 
                setFormState('verificacion');
                setMessage('✅ Identidad verificada. Crea tu nueva contraseña.');
            } else {
                setMessage(`❌ ${data.message || 'El correo o la fecha de nacimiento no coinciden.'}`);
                setFormState('error');
            }
        } catch (error) {
            setIsLoading(false);
            setMessage('❌ Error de conexión con el servidor. Intenta de nuevo más tarde.');
            setFormState('error');
        }
    };
    
    // ---------------------------------------------
    // 2. MANEJADOR: Restablecimiento de Contraseña (Paso 2)
    // ---------------------------------------------
    const handleVerificacionSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage('');

        if (newPassword !== confirmPassword) {
            setMessage('❌ Las contraseñas no coinciden.');
            return;
        }
        if (newPassword.length < 6) {
            setMessage('❌ La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setIsLoading(true);
        
        try {
            // Llama a la API que hashea y actualiza la contraseña usando el token
            const response = await fetch('/api/recover/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: verificationToken, newPassword }),
            });

            const data = await response.json();
            setIsLoading(false);

            if (response.ok && data.ok) {
                setFormState('exito');
                setMessage('✅ Contraseña actualizada exitosamente.');
            } else {
                setMessage(`❌ ${data.message || 'Error al actualizar la contraseña.'}`);
            }
        } catch (error) {
            setIsLoading(false);
            setMessage('❌ Error al intentar actualizar la contraseña.');
        }
    };


    // ---------------------------------------------
    // VISTAS DE RENDERIZADO
    // ---------------------------------------------
    
    const renderSolicitudForm = () => (
        <FormWrapper onSubmit={handleSolicitudSubmit}>
            <Heading>Paso 1: Verificar Identidad</Heading>
            <Paragraph>Por seguridad, necesitamos verificar tu correo y fecha de nacimiento.</Paragraph>

            <InputGroup>
                <Label htmlFor="email">Correo Electrónico:</Label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </InputGroup>
            
            <InputGroup>
                <Label htmlFor="birthDate">Fecha de Nacimiento:</Label>
                <Input
                    type="date"
                    id="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </InputGroup>
            
            {message && formState === 'error' && (
                <Message $isError>{message}</Message>
            )}

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Verificando...' : 'Verificar Identidad'}
            </Button>
        </FormWrapper>
    );

    const renderVerificacionForm = () => (
        <FormWrapper onSubmit={handleVerificacionSubmit}>
            <Heading>Paso 2: Crear Nueva Contraseña</Heading>
            
            {message && <Message $isSuccess>{message}</Message>}

            <InputGroup>
                <Label htmlFor="newPassword">Nueva Contraseña:</Label>
                <Input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={isLoading}
                />
            </InputGroup>

            <InputGroup>
                <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
                <Input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={isLoading}
                />
            </InputGroup>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Actualizando Contraseña...' : 'Restablecer Contraseña'}
            </Button>
            
             <Button type="button" onClick={() => setFormState('solicitud')} disabled={isLoading}>
                Volver
            </Button>
        </FormWrapper>
    );

    const renderExito = () => (
        <FormWrapper as="div" className="as-div">
            <Heading>¡Éxito! 🎉</Heading>
            <Message $isSuccess>{message}</Message>
            <Paragraph>Tu contraseña ha sido actualizada. Ya puedes iniciar sesión con tu nueva credencial.</Paragraph>
            <Button onClick={() => window.location.href = '/login'}>
                Ir a Iniciar Sesión
            </Button>
        </FormWrapper>
    );


    let content;
    switch (formState) {
        case 'solicitud':
        case 'error': 
            content = renderSolicitudForm();
            break;
        case 'verificacion':
            content = renderVerificacionForm();
            break;
        case 'exito':
            content = renderExito();
            break;
        default:
            content = renderSolicitudForm();
    }

    return (
        <Container>
            {content}
        </Container>
    );
};

export default RecuperacionContrasena;