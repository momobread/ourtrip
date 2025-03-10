'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

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
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="relative h-[5rem] w-[90%]"
          // onClick={() => handleKakaoLogin()}
          // onClick={() => setKakao(true)}
          onClick={() => signIn('kakao')}
        >
          <Image src="/member/kakao/kakao_login.png" fill alt="kakao_login" />
          카카오로그인
        </button>
        <button type="button">구글로그인</button>
        <button type="button">네이버로그인</button>
      </div>
    </div>
  );
};
export default MemberButtons;
