import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Manejar las solicitudes GET, POST, PUT y DELETE
export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const cedula = req.nextUrl.searchParams.get('cedula');
  let query = supabase.from('paciente').select('*');

  if (cedula) {
    query = query.eq('cedula', cedula);
  }

  const { data, error } = await query;

  if (error) {
    console.log('Error en GET:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const patientData = await req.json();

  const { data, error } = await supabase.from('paciente').insert([patientData]);

  if (error) {
    console.log('Error en POST:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { cedula, ...patientData } = await req.json();

  const { data, error } = await supabase.from('paciente').update(patientData).eq('cedula', cedula);

  if (error) {
    console.log('Error en PUT:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { cedula } = await req.json();

  const { data, error } = await supabase.from('paciente').delete().eq('cedula', cedula);

  if (error) {
    console.log('Error en DELETE:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
