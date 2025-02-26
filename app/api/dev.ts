import axios from 'axios';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const makeProductsBeta = async () => {
  console.log(SUPABASE_URL, 'dsdsd');
  try {
    // eslint-disable-next-line
    const response = await axios.post(
      `${SUPABASE_URL}/rest/v1/PRODUCTS`,
      [
        {
          product_num: 10136,
          product_name: '일일호텔',
          product_price: 185000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10137,
          product_name: '이이호텔',
          product_price: 186000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10138,
          product_name: '삼삼호텔',
          product_price: 187000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10139,
          product_name: '사사호텔',
          product_price: 188000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10140,
          product_name: '오오호텔',
          product_price: 189000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10141,
          product_name: '육육호텔',
          product_price: 170000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10142,
          product_name: '칠칠호텔',
          product_price: 171000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10143,
          product_name: '팔팔호텔',
          product_price: 172000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10144,
          product_name: '구구호텔',
          product_price: 10000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10145,
          product_name: '십십십호텔',
          product_price: 713000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10146,
          product_name: '십일일일호텔',
          product_price: 74500,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10147,
          product_name: '십이이이호텔',
          product_price: 75500,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10148,
          product_name: '십삼삼삼호텔',
          product_price: 76500,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10149,
          product_name: '십사사사호텔',
          product_price: 77500,
          product_content: '게하~~ 반가워요',
          product_category: 2,
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

// const test = async () => {
//   const { data } = await axios.get(
//     `${SUPABASE_URL}/rest/v1/PRODUCTS`,

//     {
//       headers: {
//         apikey: SUPABASE_KEY,
//         Authorization: `Bearer ${SUPABASE_KEY}`,
//         'Content-Type': 'applictaion/json',
//       },
//       params: {
//         product_category: 'eq.2',
//       },
//     }
//   );

// const response2 = await Promise.all(
//   data.map(async (v) => {
//     axios.post(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
//       product_lat,
//       product_lng,
//     });
//   })
// );
// };
// export { makeProductsBeta, test };
