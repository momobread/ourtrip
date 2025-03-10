import axios from 'axios';
import { NextResponse } from 'next/server';

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function POST(req: Request) {
  console.log('넘어오긴 함');
  const { filter, category, itemPerPage, currentPage, location } = await req.json();

  let filterOption;
  let locationFilter;

  if (filter === 'low_price') filterOption = 'product_price.asc';
  if (filter === 'high_price') filterOption = 'product_price.desc';
  if (filter === 'best') filterOption = 'product_liked.desc';
  if (filter === 'new') filterOption = 'product_created_at.desc';

  if (location === '서울')
    locationFilter = {
      lat: { min: 37.425, max: 37.701 },
      lng: { min: 126.766, max: 127.183 },
    };
  if (location === '수원') {
    locationFilter = {
      lat: { min: 37.216, max: 37.331 },
      lng: { min: 126.95, max: 127.08 },
    };
  }
  if (location === '인천') {
    locationFilter = {
      lat: { min: 37.37, max: 37.6 },
      lng: { min: 126.56, max: 126.84 },
    };
  }
  if (location === '부산') {
    locationFilter = {
      lat: { min: 35.05, max: 35.3 },
      lng: { min: 128.9, max: 129.25 },
    };
  }
  if (location === '대구') {
    locationFilter = {
      lat: { min: 35.76, max: 35.99 },
      lng: { min: 128.5, max: 128.72 },
    };
  }

  try {
    const response = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'applictaion/json',
      },

      params: {
        product_category: `eq.${category}`,
        product_lng: [`gte.${locationFilter?.lng.min}`, `lte.${locationFilter?.lng.max}`],
        product_lat: [`gte.${locationFilter?.lat.min}`, `lte.${locationFilter?.lat.max}`],
        order: `${filterOption}`,
        limit: Number(itemPerPage),
        offset: (Number(currentPage) - 1) * Number(itemPerPage),
      },
    });

    if (!response?.data) throw new Error('상품리스트 데이터가 없습니다');

    const countResponse = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      params: {
        product_category: `eq.${category}`,
        product_lng: [`gte.${locationFilter?.lng.min}`, `lte.${locationFilter?.lng.max}`],
        product_lat: [`gte.${locationFilter?.lat.min}`, `lte.${locationFilter?.lat.max}`],
        select: 'count',
      },
    });
    if (!countResponse?.data) throw new Error('페이지네이션 데이터가 없습니다');

    const totalItems = countResponse?.data[0]?.count || 0;
    const totalPages = Math.ceil(totalItems / Number(itemPerPage));

    return NextResponse.json({ productData: response?.data, totalItems, totalPages });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '상품리스트 패칭 에러';
    return NextResponse.json({ error: errorMessage });
  }
}
