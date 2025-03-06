import { revalidateTag } from 'next/cache';
import { getServerSession } from 'next-auth';
import { type ReactNode } from 'react';

// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { authOptions } from '@/app/_lib/utils/authOptions';

const URL = process.env.NEXTAUTH_URL;

interface CustomIconProps {
  style: string;
  product_num: string;
  children: ReactNode;
  likeCount: number;
}

const CustomIcon = async ({ style, product_num, children, likeCount }: CustomIconProps) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  async function handleLike() {
    'use server';
    if (!user?.id) return;

    await fetch(`${URL}/api/product/detail`, {
      next: { tags: [`product_${product_num}`] },
      method: 'PATCH',
      headers: {},
      body: JSON.stringify({
        product_num,
        likeCount: likeCount,
        uuid: user?.id,
      }),
    });

    revalidateTag(`product_${product_num}`);
  }

  return (
    <form action={handleLike}>
      <button className={style} type="submit">
        {children}
      </button>
    </form>
  );
};

export default CustomIcon;
