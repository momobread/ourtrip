import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;

export async function PATCH(req: Request) {
  try {
    const { product_num, likeCount, uuid } = await req.json();
    //1. 이 유저가 좋아요를 눌렀는지 확인인
    const { data: isLikedData } = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCT_LIKE`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      params: {
        product_num: `eq.${product_num}`,
        user_id: `eq.${uuid}`,
      },
    });

    if (isLikedData?.length === 0) {
      //2-1.좋아요를 누른적이없을때 -> 원래 liked 테이블블에 user추가
      await axios.post(
        `${SUPABASE_URL}/rest/v1/PRODUCT_LIKE`,
        {
          created_at: new Date(),
          product_num,
          user_id: uuid,
        },
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      //3. 프로덕트 좋아요 카운트 올리기
      await axios.patch(
        `${SUPABASE_URL}/rest/v1/PRODUCTS`,
        {
          product_liked: likeCount + 1,
        },
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          params: {
            product_num: `eq.${product_num}`,
          },
        }
      );
    } else {
      //2-2.좋아요를 눌렀을 때 => 원래 liked 테이블블에서 삭제
      await axios.delete(`${SUPABASE_URL}/rest/v1/PRODUCT_LIKE`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        params: {
          product_num: `eq.${product_num}`,
        },
      });

      //4. 프로덕트 좋아요 카운트 올리기
      await axios.patch(
        `${SUPABASE_URL}/rest/v1/PRODUCTS`,
        {
          product_liked: likeCount - 1,
        },
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          params: {
            product_num: `eq.${product_num}`,
          },
        }
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : '좋아요 기능에 오류가 생겼습니다';
    return NextResponse.json({ error: errorMessage, status: 400 });
  }
}

export async function POST(req: Request) {
  const { product_num } = await req.json();
  try {
    const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      params: {
        select: '*,PRODUCT_ROOMS(*)',
        product_num: `eq.${product_num}`,
      },
    });
    if (!data) throw new Error('아이템디테일 리스트가 비었습니다다');
    return NextResponse.json(data?.[0]);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '아이템디테일 패칭에 실패하였습니다다';
    return NextResponse.json(errorMessage);
  }
}
