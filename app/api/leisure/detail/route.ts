import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function POST(req: Request) {
  const { leisure_num } = await req.json();
  console.log('레져디테일 패칭중');
  try {
    const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/LEISURE`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      params: {
        leisure_num: `eq.${leisure_num}`,
      },
    });

    return NextResponse.json(data?.[0]);
  } catch (e) {
    const ErrorMessage = e instanceof Error ? e.message : '레져 디테일 패칭 실패';
    return NextResponse.json({ error: ErrorMessage });
  }
}
