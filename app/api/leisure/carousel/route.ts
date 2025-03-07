import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function GET() {
  try {
    const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/CAROUSELS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!data) throw new Error('레져 캐러셀이 비어져있습니다');
    const leisure_carousel = data?.[0]?.leisure_carousel?.leisure_carousel;

    return NextResponse.json(leisure_carousel);
  } catch (e) {
    const ErrorMesaage = e instanceof Error ? e.message : '레져 캐러셀 패칭에 실패하였습니다';
    return NextResponse.json({ error: ErrorMesaage });
  }
}
