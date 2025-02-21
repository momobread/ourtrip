import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function GET() {
  try {
    const { data } = (await axios.get(`${SUPABASE_URL}/rest/v1/APP_PRE_IMAGE`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      params: {
        select: 'carousel',
      },
      //   eslint-disable-next-line
    })) as { data: any; error: any };
    console.log(data);
    if (!data) throw new Error(' 캐러셀 데이터가 없습니다');
    const carousel = data?.[0]?.carousel?.carousel;
    return NextResponse.json(carousel);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '캐러셀이미지 패칭 실패';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
