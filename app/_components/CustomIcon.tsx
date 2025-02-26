// 'use client';

// import { useSession } from 'next-auth/react';
// import SessionWrapper from './Session/SessionWrapper';
// import { updateLiked } from '../api/product/detail/route';
// import { useEffect, useState } from 'react';
// import { usePathname, useParams } from 'next/navigation';
// import axios from 'axios';
// import { revalidateTag } from 'next/cache';

// const CustomIcon = ({ style, children, pathkey, likeCount }) => {
//   const product_num = useParams()?.[pathkey];

//   const { data } = useSession();
//   const user = data?.user;
//   const [isClick, setIsClick] = useState<boolean>(false);

//   const handleIconClick = () => {
//     if (!user?.id) return;
//     setIsClick(true);
//   };

//   useEffect(() => {
//     if (!isClick) return;
//     async function updateLike() {
//       //   try {
//       await fetch('/api/product/detail', {
//         next: { tags: [`product_${product_num}`] },
//         method: 'PATCH',
//         headers: {},
//         body: JSON.stringify({
//           product_num,
//           likeCount: likeCount + 1,
//         }),
//       });
//       //     await axios.patch('/api/product/detail', {
//       //       product_num,
//       //       likeCount: likeCount + 1,
//       //     });
//       //   } catch (e) {
//       //     console.log(e.message);
//       //   }
//     }
//     updateLike();
//   }, [isClick]);

//   return (
//     <p className={style} onClick={handleIconClick}>
//       {children}
//     </p>
//   );
// };
// export default CustomIcon;

import { revalidateTag } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const URL = process.env.NEXTAUTH_URL;

const CustomIcon = async ({ style, product_num, children, likeCount }) => {
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
