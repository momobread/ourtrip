'use client';
import Link from 'next/link';

const MemberButtons = () => {
  return (
    <div>
      <button
        type="submit"
        className="rounded-lg border border-grey-100 p-[1rem] text-[2rem] font-bold text-grey-100"
      >
        로그인
      </button>
      <div>
        <Link href="/join">
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
      <div>
        <button type="button">카카오로그인</button>
        <button type="button">구글로그인</button>
        <button type="button">네이버로그인</button>
      </div>
    </div>
  );
};
export default MemberButtons;
