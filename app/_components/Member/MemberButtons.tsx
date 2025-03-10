'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
console.log(NEXTAUTH_URL);
const MemberButtons = () => {
  return (
    <div className="flex flex-col gap-[1rem]">
      <button
        type="submit"
        className="rounded-lg border border-grey-100 p-[1rem] text-[2rem] font-bold text-grey-100"
      >
        로그인
      </button>
      <div>
        <Link href="/join" className="mr-[0.5rem]">
          <button
            type="button"
            className="rounded-lg border border-grey-100 p-[1rem] text-[2rem] font-bold text-grey-100"
          >
            회원가입
          </button>
        </Link>
        <button
          type="button"
          className="rounded-lg border border-grey-100 p-[1rem] text-[2rem] font-bold text-grey-100"
        >
          아이디찾기/비밀번호찾기
        </button>
      </div>
      <div className="flex flex-col items-center gap-[1rem]">
        <button
          type="button"
          className="relative h-[4.7rem] w-[100%]"
          // onClick={() => handleKakaoLogin()}
          // onClick={() => setKakao(true)}
          onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/' })}
        >
          <Image src="/member/kakao/kakao_login_medium_wide.png" fill alt="kakao_login" />
          카카오로그인
        </button>
        <button
          type="button"
          className="relative h-[5rem] w-[100%]"
          onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })}
        >
          <Image src="/member/google/web_light_sq_SI@4x.png" fill alt="google_login" />
          구글로그인
        </button>
        <button type="button" onClick={() => signIn('github', { callbackUrl: '/' })}>
          깃로그인
        </button>
      </div>
    </div>
  );
};
export default MemberButtons;
