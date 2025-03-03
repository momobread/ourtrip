import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function POST(req: Request) {
  const { product_num } = await req.json();
  try {
    const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCT_REVIEWS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },

      params: {
        product_num: `eq.${product_num}`,
        select: '*, USER(user_name)',
      },
    });

    if (!data) throw new Error('리뷰가에 이상이 있습니다 ');
    if (data.length === 0) return NextResponse.json(null);

    const reviewData = await Promise.all(
      data?.map((review) => {
        return {
          ...review,
          review_img: review?.review_img === '' ? [] : review?.review_img,
        };
      })
    );

    return NextResponse.json(reviewData);
  } catch (e) {
    const ErrorMessage = e instanceof Error ? e.message : '리뷰 패칭에 실패하였습니다';
    return NextResponse.json(ErrorMessage);
  }
}
