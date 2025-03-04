import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;

export async function POST(req: Request) {
  console.log('sdsd');
  const formData = await req.formData();

  const review_img = formData.get('review_img') as File;

  console.log(review_img, '여기여기');

  const fileName = `${Date.now()}_${review_img}`;
  const url = `${SUPABASE_URL}/storage/v1/obejct/public/review/${fileName}`;

  //   try {
  //     const formData = new FormData();
  //     formData.append('file', review_img);
  //     const response = axios.post(url);
  //   } catch (e) {}0

  return NextResponse.json('ffff');
}
