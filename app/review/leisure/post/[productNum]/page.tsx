//⭐재진행행
// import Image from 'next/image';

// import MainNav from '@/app/_components/layout/MainNav';
// import ReviewForm from '@/app/_components/Review/ReviewForm';
// import SessionWrapper from '@/app/_components/Session/SessionWrapper';
// import { ProductType } from '@/app/_lib/types/product';
// import { priceFormat } from '@/app/_lib/utils/format';

// const NEXTURL = process.env.NEXTAUTH_URL;

// async function ReviewPage({ params }: { params: Promise<Record<string, string>> }) {
//   const product_num = (await params)?.productNum;
//   const productResponse = await fetch(`${NEXTURL}/api/product/detail`, {
//     method: 'POST',
//     headers: {},
//     body: JSON.stringify({
//       product_num,
//     }),
//   });
//   const productData: ProductType = await productResponse.json();
//   const { product_content, product_img, product_name, product_price } = productData;

//   return (
//     <section className="min-h-screen">
//       <MainNav />
//       <div className="mb-[5rem] flex flex-col items-center gap-[2rem]">
//         <div className="flex h-[23rem] w-[70%] items-center justify-center gap-[1rem] rounded-lg bg-teal-200">
//           <div className="relative h-[20rem] w-[30rem]">
//             <Image src={product_img} fill alt={product_num} className="rounded-lg" />
//           </div>
//           <div className="flex h-[20rem] flex-[0.95] flex-col justify-center gap-[0.5rem] rounded-lg border border-slate-400 px-[2rem]">
//             <span className="font-bold">{product_name}</span>
//             <p>{product_content}</p>
//             <span>{priceFormat(product_price)}원</span>
//           </div>
//         </div>
//         <SessionWrapper>
//           <ReviewForm product_num={product_num} />
//         </SessionWrapper>
//       </div>
//     </section>
//   );
// }

// export default ReviewPage;
