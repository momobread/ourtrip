'use client';

import { signIn } from 'next-auth/react';

const page = () => {
  return <div onClick={() => signIn()}>page</div>;
};
export default page;
