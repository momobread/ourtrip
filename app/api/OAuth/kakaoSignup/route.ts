import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;

const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const KAKAO_TOKEN_URL = process.env.OAUTH_KAKAO_TOKEN_URL;
const KAKAO_REDIRECT_URL = process.env.OAUTH_KAKAO_REDIRECT_URI;
const KAKAO_REST_API_KEY = process.env.OAUTH_KAKAO_REST_API_KEY;
const KAKAO_GETUSER_URL = process.env.OAUTH_KAKAO_GETUSER_URL;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) return NextResponse.json({ error: '유효하지 않은 인가코드입니다' }, { status: 400 });

  try {
    const responseToken = await axios.post(
      `${KAKAO_TOKEN_URL}`,
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_REST_API_KEY ?? '',
        redirect_uri: KAKAO_REDIRECT_URL ?? '',
        code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );
    const token = responseToken?.data?.access_token;

    const { data: userInfo } = await axios.get(`${KAKAO_GETUSER_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const kakaoId = userInfo.id;
    const name = userInfo.properties?.nickname;
    const profile = userInfo.properties?.profile_image;
    const email = userInfo.kakao_account?.email;
    // 유저 존재하는지 체킹

    console.log(email);

    console.log('유저조회시작');
    const { data: existingUser, error } = await axios.get(`${SUPABASE_URL}/auth/v1/admin/users`, {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY ?? '',
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });

    const userList = existingUser?.users;

    const existing = userList?.filter((user) => user.email === email);

    //있으면 ? -> 홈으로 리다이랙트
    if (existing.length > 0) {
      console.log('로그인중');
      const { data, error } = await axios.post(
        // `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        `${BASE_URL}/api/auth/signin`,
        {
          email,
          password: kakaoId,
        },
        {
          headers: {
            apikey: SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!data) throw new Error(error.message);
      return NextResponse.redirect(new URL('/', req.url));
    } else {
      console.log('회원가입중');

      const { data, error } = await axios.post(
        `${BASE_URL}/api/member/signup`,
        {
          email,
          password: `${kakaoId}!!`,
          data: {
            birth: '',
            gender: '',
            name,
            nickname: '',
            safePassword: `${kakaoId}!!`,
            phoneNumber: '',
          },
        },
        {
          headers: {
            apikey: SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      // 커스텀 엔드포인트에서 한 후 다시 돌아온다. 그러면 이미 커스텀엔드포인트의함수에서 sesession을 반환해서 밑에 return redirect만해도 UseSEession을 적용할 수 있다
      console.log('다시 돌아오나요>');
      if (!data) throw new Error(error.message);
      return NextResponse.redirect(new URL('/', req.url));
      // 원래는 UseSession은 null이나 user값 같은게 필요한데 supabase auth랑 연결해서 supabase가
      // session을 클라 저장소에 넣어서 null값이 안나오는거임
      // return NextResponse.json({ success: true, user: data }, { status: 201 });
    }

    //없으면 ? 가입시키기
  } catch (e) {
    console.log(e.message);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
