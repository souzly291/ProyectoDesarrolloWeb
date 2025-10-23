// app/api/recover/reset-password/route.ts

import { supabase } from "@/lib/supabase"; // Asegúrate de que esta importación sea correcta
import { NextResponse } from "next/server";

// --- Funciones Auxiliares ---

/**
 * Función para extraer el ID del usuario del token temporal.
 * El token debe tener el formato: "USER_ID_SECRET_TIMESTAMP"
 */
function getUserIdFromToken(token: string): number | null {
    // El token del Paso 1 fue generado como: `USER_${data.id}_SECRET_${Date.now()}`
    const parts = token.split('_'); 
    
    // Verificamos que tenga las partes correctas y que la primera parte sea 'USER'
    if (parts.length >= 2 && parts[0] === 'USER') {
        const userId = parseInt(parts[1]);
        // Devolvemos el ID si es un número válido, sino null
        return isNaN(userId) ? null : userId;
    }
    return null;
}

// -------------------------------------------------------------
// RUTA PRINCIPAL (POST)
// -------------------------------------------------------------

export async function POST(req: Request) {
    const body = await req.json();
    const { token, newPassword } = body;

    // 1. Validación de entrada
    if (!token || !newPassword || newPassword.length < 6) {
        return NextResponse.json({ 
            ok: false, 
            message: 'Token o contraseña inválida (mínimo 6 caracteres).' 
        }, { status: 400 });
    }
    
    // 2. Extracción y validación del token
    const userId = getUserIdFromToken(token);
    
    if (!userId) {
        // Fallo la validación de la estructura del token.
        return NextResponse.json({ 
            ok: false, 
            message: 'Token de verificación inválido o expirado. Reinicie el proceso.' 
        }, { status: 403 });
    }

    try {
        // 3. HASHING DE CONTRASEÑA
        // ----------------------------------------------------------------------------------
        // *** ⚠️ ESTO DEBE SER REEMPLAZADO CON UNA LIBRERÍA DE HASHING REAL (ej: bcrypt) ⚠️ ***
        // const hashedPassword = await bcrypt.hash(newPassword, 10);
        // ----------------------------------------------------------------------------------
        const hashedPassword = newPassword; // SIMULACIÓN - PELIGROSO EN PRODUCCIÓN
        
        // 4. Actualizar el password_hash en la DB
        const { error } = await supabase
            .from('accounts')
            .update({ 
                password_hash: hashedPassword,
                updated_at: new Date().toISOString(), // Opcional: Actualizar el timestamp
            })
            .eq('id', userId);

        if (error) {
            console.error('Supabase update error:', error);
            return NextResponse.json({ 
                ok: false, 
                message: 'Error de base de datos al actualizar la contraseña.' 
            }, { status: 500 });
        }

        // 5. Respuesta de Éxito
        return NextResponse.json({ 
            ok: true, 
            message: 'Contraseña actualizada exitosamente.' 
        }, { status: 200 });

    } catch (error) {
        console.error('Error interno de servidor al restablecer contraseña:', error);
        return NextResponse.json({ ok: false, message: 'Error interno del servidor.' }, { status: 500 });
    }
}