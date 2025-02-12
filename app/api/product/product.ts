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
  // console.log('시작');
  // console.log(filter, category, itemPerPage, currentPage);
  let filterOption;
  // if (filter === 'all') filterOption = 'id.desc';
  if (filter === 'low_price') filterOption = 'product_price.asc';
  if (filter === 'high_price') filterOption = 'product_price.desc';
  if (filter === 'best') filterOption = 'product_liked.desc';
  if (filter === 'new') filterOption = 'product_created_at.desc';

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
    // eslint-disable-next-line
    const response = await axios.post(
      `${SUPABASE_URL}/rest/v1/PRODUCTS`,
      [
        {
          product_name: '가가호텔',
          product_price: 135000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '나나호텔',
          product_price: 145000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '다다호텔',
          product_price: 155000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '라라호텔',
          product_price: 165000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '마마호텔',
          product_price: 4923300,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '바바호텔',
          product_price: 175000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '사사호텔',
          product_price: 472300,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '아아호텔',
          product_price: 111100,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '자자호텔',
          product_price: 123000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '차차호텔',
          product_price: 640000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '카카호텔',
          product_price: 630000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '타타호텔',
          product_price: 420000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '파호텔',
          product_price: 410000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_name: '하하호텔',
          product_price: 650000,
          product_content: '게하~~ 반가워요',
          product_category: 1,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
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
