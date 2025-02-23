'use client';

import { signIn } from 'next-auth/react';

const page = () => {
  return (
    <div>
      <div onClick={() => signIn('kakao')}>page</div>
      윈도우테스트트
      sdsdsdsd
    </div>
  );
};
export default page;
