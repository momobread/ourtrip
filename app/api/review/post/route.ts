import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;

export async function POST(req: Request) {
  const formData = await req.formData();

  const review_img = formData.get('review_img') as File;
  const review_title = formData.get('review_title');
  const review_content = formData.get('review_content');
  const review_user = formData.get('review_user');
  const product_num = formData.get('product_num');
  const review_rate = formData.get('review_rate');

  try {
    let fileName = '';
    let url = '';

    if (review_img instanceof File) {
      fileName = `${Date.now()}_${review_img?.name}`;
      url = `${SUPABASE_URL}/storage/v1/object/review/${fileName}`;
      // 스토리지 업데이트트
      const formData = new FormData();
      formData.append('file', review_img);

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response) throw new Error('스토리지 업데이트에 실패하였습니다');
    }

    //이거 할떄 USER테이블에 user가 등록되어있는지 확인, uuid가 USER테이블에 등록되어 있지 않으면 아무것도 안됨
    const reponse2 = await axios.post(
      `${SUPABASE_URL}/rest/v1/PRODUCT_REVIEWS`,
      {
        created_at: new Date(),
        product_num,
        review_title,
        review_content,
        review_rate,
        review_img: url,
        review_user,
      },
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
      }
    );

    if (!reponse2.data) throw new Error('리뷰등록에 실패하였습니다(DB)');

    return NextResponse.json({ status: 'success' });

    // 리뷰테이블 생성
  } catch (e) {
    const ErrorMesaage = e instanceof Error ? e.message : '리뷰작성에 실패하였습니다';
    return NextResponse.json({ error: ErrorMesaage });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  console.log('삭제중');
  try {
    await axios.delete(`${SUPABASE_URL}/rest/v1/PRODUCT_REVIEWS`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      params: {
        id: `eq.${id}`,
      },
    });
    return NextResponse.json({ status: 'success' });
  } catch (e) {
    const ErrorMesaage = e instanceof Error ? e.message : '삭제실패';
    return NextResponse.json(ErrorMesaage);
  }
}
