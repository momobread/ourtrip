import Image from 'next/image';

import LeisureInform from '@/app/_components/Leisure/LeisureInform';
import PreviewReview from '@/app/_components/Review/PreviewReview';
import { LeisureType } from '@/app/_lib/types/leisure';
import { ReviewType } from '@/app/_lib/types/review';
import { priceFormat } from '@/app/_lib/utils/format';

const NEXTURL = process.env.NEXTAUTH_URL;

interface LeisureDetailProps {
  data: LeisureType;
}

const LeisureDetail = async ({ data }: LeisureDetailProps) => {
  const { leisure_content, leisure_img, leisure_name, leisure_price, leisure_num, leisure_detail } =
    data;

  const reviewResponse = await fetch(`${NEXTURL}/api/leisure/review`, {
    next: { tags: [`leisure_review`] },
    method: 'POST',
    headers: {},
    body: JSON.stringify({
      leisure_num,
    }),
  });

  const reviewData: ReviewType[] = await reviewResponse?.json();
  console.log(reviewData);
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <div className="flex h-[30rem] w-screen gap-[1%] sm:h-[60rem] sm:w-[64%]">
          <div className="relative h-full w-full">
            <Image src={leisure_img} fill alt={`${leisure_num}`} className="rounded-xl" />
          </div>
        </div>
        <div className="relative my-[1rem] flex w-full flex-col gap-[1rem] px-[1rem] sm:w-[64%] sm:p-0">
          <span className="text-[3.5rem] font-semibold">{leisure_name}</span>
          <div className="flex justify-between">
            <p>{leisure_content}</p>
            <span>{priceFormat(leisure_price)}원</span>
          </div>
        </div>

        <PreviewReview
          reviewData={reviewData}
          product_num={leisure_num}
          style="sm:w-[64%] w-screen h-[10rem] sm:h-[18rem]"
        />
        <LeisureInform data={leisure_detail} />
      </div>
    </div>
  );
};
export default LeisureDetail;
