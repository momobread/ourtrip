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

const fetchPreviewProducts = async (filterLocation: string): Promise<ProductType[]> => {
  // let filterOption;
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

  const category = '1';
  // const locationFilter = { lat: { min: 37.425, max: 37.701 }, lng: { min: 126.766, max: 127.183 } };
  try {
    const { data, error } = (await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
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
      // eslint-disable-next-line
    })) as { data: ProductType[]; error: any };
    if (!data) throw new Error(error.message);

    return data;
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message);
    else {
      throw new Error('상품 미리보기 프리뷰 실패');
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

export { fetchProducts, fetchProduct, fetchPreviewProducts };
// export { fetchProducts, makeProductsBeta };
