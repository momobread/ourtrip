import axios from 'axios';
import { NextResponse } from 'next/server';

import { ReviewType } from '@/app/_lib/types/review';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function POST(req: Request) {
  console.log('레져리뷰 돌아감');
  const { leisure_num } = await req.json();
  try {
    const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/LEISURE_REVIEWS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },

      params: {
        product_num: `eq.${leisure_num}`,
        select: '*, USER(user_name)',
      },
    });

    if (!data) throw new Error('레져리뷰가에 이상이 있습니다 ');
    console.log(data);
    if (data.length === 0) return NextResponse.json(null);

    const leisureReviewData = await Promise.all(
      data?.map((review: ReviewType) => {
        return {
          ...review,
          review_img: review?.review_img === '' ? [] : review?.review_img,
        };
      })
    );

    return NextResponse.json(leisureReviewData);
  } catch (e) {
    const ErrorMessage = e instanceof Error ? e.message : '레져리뷰 패칭에 실패하였습니다';
    return NextResponse.json(ErrorMessage);
  }
}
