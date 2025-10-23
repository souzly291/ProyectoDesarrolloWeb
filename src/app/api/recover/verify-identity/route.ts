// app/api/recover/verify-identity/route.ts

// Asegúrate de que esta ruta a tu cliente de Supabase es correcta:
import { supabase } from "@/lib/supabase"; 
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, birth_date } = body;

    // 1. Validación básica de la petición
    if (!email || !birth_date) {
        return NextResponse.json({ ok: false, message: 'Faltan datos de verificación.' }, { status: 400 });
    }

    try {
        // 2. Consulta segura a la tabla 'accounts' en Supabase
        const { data, error } = await supabase
            .from('accounts')
            .select('id') // Solo necesitamos el ID para el token
            .eq('email', email)
            .eq('birth_date', birth_date)
            .single(); // Esperamos solo un resultado

        if (error || !data) {
            // No se encontró la cuenta o hubo un error en la DB
            console.error('Supabase verification error:', error);
            return NextResponse.json({ ok: false, message: 'Datos no coinciden con los registros.' }, { status: 404 });
        }

        // 3. Éxito: Generación del Token Temporal
        // NOTA: Este token simple es para fines de demostración. 
        // En producción, usa tokens más seguros (como JWT).
        const userId = data.id;
        const verificationToken = `USER_${userId}_SECRET_${Date.now()}`;

        // 4. Respuesta exitosa al frontend (Paso 1 completado)
        return NextResponse.json({ 
            ok: true, 
            message: 'Identidad verificada.', 
            verificationToken 
        }, { status: 200 });

    } catch (error) {
        console.error('Error interno de servidor al verificar identidad:', error);
        return NextResponse.json({ ok: false, message: 'Error interno del servidor.' }, { status: 500 });
    }
}