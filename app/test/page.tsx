'use client';

import { signIn } from 'next-auth/react';

const page = () => {
  return (
    <div>
      <div onClick={() => signIn('kakao')}>test</div>
    </div>
  );
};
export default page;
