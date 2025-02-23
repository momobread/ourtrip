'use client';

import { signIn } from 'next-auth/react';

const page = () => {
  return (
    <div>
      <div onClick={() => signIn('kakao')}>test</div>
      {/* 맥테스트 */}
    </div>
  );
};
export default page;
