import axios from 'axios';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export async function POST(req: Request) {
  try {
    const { email, birth, gender, name, nickname, password, safePassword, phoneNumber } =
      await req.json();
    console.log(name);
    const { data } = await axios.post(
      `
        ${SUPABASE_URL}/auth/v1/signup`,
      {
        email,
        password,
        data: {
          birth,
          gender,
          name,
          nickname,
          safePassword,
          phoneNumber,
        },
      },

      {
        headers: {
          apikey: SUPABASE_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('signup');
    if (!data) throw new Error('회원가입에 실패하였스빈가가');
    return NextResponse.json({ success: true, user: data }, { status: 201 });
    // eslint-disable-next-line
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 400 });
  }
}
