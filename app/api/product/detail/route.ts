// import axios from 'axios';
// import { NextRequest, NextResponse } from 'next/server';

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// export async function GET(req: NextRequest) {
//   console.log('실행중');
//   console.log(new URL(req.url));
//   const { searchParams } = new URL(req.url);
//   const itemNum = searchParams.get('itemNum');

//   try {
//     const { data, error } = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCTS`, {
//       headers: {
//         apikey: SUPABASE_KEY,
//         Authorization: `Bearer ${SUPABASE_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       params: {
//         product_num: `eq.${itemNum}`,
//       },
//     });
//     if (!data) throw new Error(error.message);
//     return NextResponse.json({ data: data?.[0] });
//   } catch (e) {
//     throw new Error(e.message);
//   }
// }
