import axios from 'axios';

import { FetchProductsReturnType, type FetchProductsType } from '@/app/_lib/types/params';
import { ProductType } from '@/app/_lib/types/product';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const fetchProducts = async ({
  filter,
  category,
  itemPerPage,
  currentPage,
  location,
}: FetchProductsType): Promise<FetchProductsReturnType> => {
  // await new Promise((res) => setTimeout(res, 3000));
  // console.log('시작');
  // console.log(filter, category, itemPerPage, currentPage);
  let filterOption;
  let locationFilter;
  // if (filter === 'all') filterOption = 'id.desc';
  if (filter === 'low_price') filterOption = 'product_price.asc';
  if (filter === 'high_price') filterOption = 'product_price.desc';
  if (filter === 'best') filterOption = 'product_liked.desc';
  if (filter === 'new') filterOption = 'product_created_at.desc';
  if (location === 'seoul')
    locationFilter = { lat: { min: 37.425, max: 37.701 }, lng: { min: 126.766, max: 127.183 } };

  console.log(locationFilter);
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
        // 'product_lat.gte': locationFilter?.lat.min,
        // 'product_lat.lte': locationFilter?.lat.max,
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
        product_lng: [`gte.${locationFilter?.lng.min}`, `lte.${locationFilter?.lng.max}`],
        product_lat: [`gte.${locationFilter?.lat.min}`, `lte.${locationFilter?.lat.max}`],
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
    console.log(e.message);
    if (e instanceof Error) {
      throw e;
    } else {
      throw new Error(`상품페치에 실패하였습니다`);
    }
  }
};

const fetchProduct = async (itemNum: string): Promise<ProductType> => {
  try {
    const { data, error } = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      params: {
        select: '*,PRODUCT_ROOMS(*)',
        product_num: `eq.${itemNum}`,
      },
    });
    if (!data) throw new Error(error.message);
    return data?.[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

export { fetchProducts, fetchProduct };
// export { fetchProducts, makeProductsBeta };
