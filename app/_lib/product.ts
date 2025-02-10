import axios from 'axios';

import { FetchProductsReturnType, type FetchProductsType } from '@/app/_lib/types/params';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const fetchProducts = async ({
  filter,
  category,
  itemPerPage,
  currentPage,
}: FetchProductsType): Promise<FetchProductsReturnType> => {
  // await new Promise((res) => setTimeout(res, 3000));

  let filterOption;
  if (filter === 'all') filterOption = 'id.desc';
  if (filter === 'low_price') filterOption = 'product_price.asc';
  if (filter === 'high_price') filterOption = 'product_price.desc';
  if (filter === 'best') filterOption = 'product_liked.desc';

  try {
    const response = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'applictaion/json',
      },

      params: {
        product_category: `eq.${category}`,
        order: `${filterOption}`,
        limit: Number(itemPerPage),
        offset: (Number(currentPage) - 1) * Number(itemPerPage),
      },
    });

    const countResponse = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      params: {
        product_category: `eq.${category}`,
        select: 'count',
      },
    });
    const totalItems = countResponse?.data[0]?.count || 0;
    const totalPages = Math.ceil(totalItems / Number(itemPerPage));

    return {
      productData: response?.data,
      totalItems,
      totalPages,
    };
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    } else {
      throw new Error(`상품페치에 실패하였습니다`);
    }
  }
};

const makeProductsBeta = async () => {
  console.log(SUPABASE_URL, 'dsdsd');
  try {
    const response = await axios.post(
      `${SUPABASE_URL}/rest/v1/PRODUCTS`,
      [
        {
          product_name: '레이호텔',
          product_price: 13333333,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
        {
          product_name: '기역호텔',
          product_price: 4480000,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
        {
          product_name: '니은호텔',
          product_price: 1350000,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
        {
          product_name: '동그라호텔',
          product_price: 550000,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
        {
          product_name: '세모호텔',
          product_price: 470000,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
        {
          product_name: '네모호텔',
          product_price: 220000,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
        {
          product_name: '다이아호텔',
          product_price: 350000,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
        {
          product_name: '타원호텔',
          product_price: 220000,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
        {
          product_name: '구호텔',
          product_price: 140000,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
        {
          product_name: '스프링호텔',
          product_price: 200000,
          product_content: '안녕하세요 반가워요',
          product_category: 2,
        },
      ],
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
};
export { fetchProducts, makeProductsBeta };
