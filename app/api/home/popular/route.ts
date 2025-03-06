import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function GET() {
  try {
    const { data } = (await axios.get(`${SUPABASE_URL}/rest/v1/APP_PRE_IMAGE`, {
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      params: {
        select: '*',
      },
      //   eslint-disable-next-line
    })) as { data: any; error: any };
    if (!data) throw new Error('인기 카드 이미지 데이터가 없습니다');
    const popularCard = data?.[0];
    return NextResponse.json(popularCard);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '인기카드 패칭 실패';
    throw NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

export async function POST(req: Request) {
  const { filterLocation, category } = await req.json();
  let locationFilter;
  if (filterLocation === '서울')
    locationFilter = {
      lat: { min: 37.425, max: 37.701 },
      lng: { min: 126.766, max: 127.183 },
    };
  if (filterLocation === '수원') {
    locationFilter = {
      lat: { min: 37.216, max: 37.331 },
      lng: { min: 126.95, max: 127.08 },
    };
  }
  if (filterLocation === '인천') {
    locationFilter = {
      lat: { min: 37.37, max: 37.6 },
      lng: { min: 126.56, max: 126.84 },
    };
  }
  if (filterLocation === '부산') {
    locationFilter = {
      lat: { min: 35.05, max: 35.3 },
      lng: { min: 128.9, max: 129.25 },
    };
  }
  if (filterLocation === '대구') {
    locationFilter = {
      lat: { min: 35.76, max: 35.99 },
      lng: { min: 128.5, max: 128.72 },
    };
  }

  try {
    const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'applictaion/json',
      },

      params: {
        product_category: `eq.${category}`,
        product_lng: [`gte.${locationFilter?.lng.min}`, `lte.${locationFilter?.lng.max}`],
        product_lat: [`gte.${locationFilter?.lat.min}`, `lte.${locationFilter?.lat.max}`],
      },
    });

    if (!data) throw new Error('구글맵 미리 보기 상품리스트가 없습니다');
    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '구글맵 미치보기 패칭 실패';
    return NextResponse.json(errorMessage);
  }
}
