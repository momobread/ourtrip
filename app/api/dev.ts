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
          product_num: 10180,
          product_name: '팡팡호텔',
          product_price: 381500,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10181,
          product_name: '퍙퍙퐁호텔',
          product_price: 386100,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10182,
          product_name: '펑펑퍼호텔',
          product_price: 387010,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10183,
          product_name: '평평사호텔',
          product_price: 381800,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10184,
          product_name: '포포오호텔',
          product_price: 381000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10185,
          product_name: '푱푱육호텔',
          product_price: 373000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10186,
          product_name: '풍풍칠호텔',
          product_price: 370400,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        {
          product_num: 10187,
          product_name: '퓽퓽팔호텔',
          product_price: 375000,
          product_content: '게하~~ 반가워요',
          product_category: 2,
          product_img:
            'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        },
        // {
        //   product_num: 10173,
        //   product_name: '프프구호텔',
        //   product_price: 260000,
        //   product_content: '게하~~ 반가워요',
        //   product_category: 2,
        //   product_img:
        //     'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        // },
        // {
        //   product_num: 10174,
        //   product_name: '피피십십호텔',
        //   product_price: 722000,
        //   product_content: '게하~~ 반가워요',
        //   product_category: 2,
        //   product_img:
        //     'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        // },
        // {
        //   product_num: 10175,
        //   product_name: '패패일일일호텔',
        //   product_price: 745300,
        //   product_content: '게하~~ 반가워요',
        //   product_category: 2,
        //   product_img:
        //     'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        // },
        // {
        //   product_num: 10176,
        //   product_name: '페페이이이호텔',
        //   product_price: 725100,
        //   product_content: '게하~~ 반가워요',
        //   product_category: 2,
        //   product_img:
        //     'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        // },
        // {
        //   product_num: 10177,
        //   product_name: '퐤퐤삼삼삼호텔',
        //   product_price: 263500,
        //   product_content: '게하~~ 반가워요',
        //   product_category: 2,
        //   product_img:
        //     'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        // },
        // {
        //   product_num: 10178,
        //   product_name: '픠픠사사사호텔',
        //   product_price: 247500,
        //   product_content: '게하~~ 반가워요',
        //   product_category: 2,
        //   product_img:
        //     'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        // },
        // {
        //   product_num: 10179,
        //   product_name: '폐폐사사사호텔',
        //   product_price: 275500,
        //   product_content: '게하~~ 반가워요',
        //   product_category: 2,
        //   product_img:
        //     'https://zmuwonipjizutjtllmoq.supabase.co/storage/v1/object/public/preview_img/po_accommdation/hotel2.jpg',
        // },
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
