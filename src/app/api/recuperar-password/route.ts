import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// URL a la que Supabase debe redirigir al usuario después de hacer clic en el enlace del correo.
// **IMPORTANTE**: CÁMBIALA a la URL real de tu página de restablecimiento.
const REDIRECT_URL = process.env.NEXT_PUBLIC_PASSWORD_RESET_URL || 'http://localhost:3000/restablecer-contrasena';

/**
 * Maneja la petición POST para iniciar el flujo de recuperación de contraseña.
 * Simplemente le pide a Supabase que envíe el correo de restablecimiento.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ ok: false, message: 'Se requiere el correo electrónico.' }, { status: 400 });
        }

        // 1. Llama al método "resetPasswordForEmail" de Supabase Auth
        // Supabase se encarga de:
        //    a) Verificar si el correo existe.
        //    b) Generar un token único.
        //    c) Enviar el correo electrónico con el enlace de restablecimiento.
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: REDIRECT_URL,
        });

        if (error) {
            // Manejamos errores de Supabase, pero NO revelamos la causa exacta por seguridad
            console.error("Supabase Error en recovery:", error.message);
            
            // Nota de Seguridad: Generalmente se devuelve un éxito, incluso si el correo no existe, 
            // para evitar enumeración de usuarios (user enumeration).
            return NextResponse.json({ 
                ok: true, 
                message: "Si la cuenta existe, se ha enviado un enlace de restablecimiento a tu correo." 
            }, { status: 200 });
        }

        // 2. Respuesta de Éxito
        return NextResponse.json({ 
            ok: true, 
            message: "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña." 
        }, { status: 200 });

    } catch (error) {
        console.error("Error inesperado en la ruta de recuperación:", error);
        return NextResponse.json({ ok: false, message: 'Error interno del servidor.' }, { status: 500 });
    }
}