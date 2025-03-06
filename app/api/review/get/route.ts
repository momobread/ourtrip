import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;

export async function POST(req: Request) {
  const { review_num } = await req.json();

  try {
    const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCT_REVIEWS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      params: {
        id: `eq.${review_num}`,
      },
    });
    const reviewData = data?.[0];
    return NextResponse.json(reviewData);
  } catch (e) {
    const ErrorMessage = e instanceof Error ? e.message : `${review_num}리뷰 불러오기 실패`;
    return NextResponse.json({ error: ErrorMessage });
  }
}
