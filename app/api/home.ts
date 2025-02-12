import axios from 'axios';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export const fetchCarousel = async () => {
  try {
    console.log('시작');
    const response = await axios.get(`${SUPABASE_URL}/rest/v1/APP_PRE_IMAGE`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      params: {
        select: 'carousel',
      },
    });
    return response.data?.[0]?.carousel?.carousel;
  } catch (e) {
    if (e instanceof Error) return e;
    else throw new Error('캐러셀 이미지 로딩 실패');
  }
};

export const fetchPopularCard = async () => {
  try {
    const response = await axios.get(`${SUPABASE_URL}/rest/v1/APP_PRE_IMAGE`, {
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      params: {
        select: '*',
      },
    });
    const data = response.data?.[0];
    return data;
  } catch (e) {
    if (e instanceof Error) return e;
    else throw new Error('홈 쇼케이스 이미지 로딩 실패');
  }
};
