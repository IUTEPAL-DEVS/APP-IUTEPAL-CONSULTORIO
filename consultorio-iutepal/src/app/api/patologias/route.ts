import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const systemId = req.nextUrl.searchParams.get('system_id');

  if (!systemId) {
    return NextResponse.json({ error: 'El ID del sistema de patologías es obligatorio.' }, { status: 400 });
  }

  const { data, error } = await supabase.from('pathology').select('*').eq('patholy_system_id', systemId);

  if (error) {
    console.log('Error al obtener patologías:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
