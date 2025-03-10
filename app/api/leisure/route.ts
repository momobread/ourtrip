import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function GET() {
  console.log('leisure');
  try {
    const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/LEISURE`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!data) throw new Error('leisure 데이터가 비어있습니다');

    return NextResponse.json(data);
  } catch (e) {
    const ErrorMessage = e instanceof Error ? e.message : '레져 패칭 실패';
    return NextResponse.json({ error: ErrorMessage });
  }
}
