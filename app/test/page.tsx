'use client';

import { signIn } from 'next-auth/react';

const page = () => {
  return (
    <div>
      <div onClick={() => signIn('kakao')}>page</div>
    </div>
  );
};
export default page;
