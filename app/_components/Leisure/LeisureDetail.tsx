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
        <div className="flex h-[60rem] w-[64%] gap-[1%]">
          <div className="relative h-full w-full">
            <Image src={leisure_img} fill alt={`${leisure_num}`} className="rounded-xl" />
          </div>
        </div>
        <div className="relative my-[1rem] flex w-[64%] flex-col gap-[1rem]">
          <span className="text-[3.5rem] font-semibold">{leisure_name}</span>
          <div className="flex justify-between">
            <p>{leisure_content}</p>
            <span>{priceFormat(leisure_price)}원</span>
          </div>
        </div>

        <PreviewReview
          reviewData={reviewData}
          product_num={leisure_num}
          style="w-[64%] h-[18rem]"
        />
        <LeisureInform data={leisure_detail} />
      </div>
    </div>
  );
};
export default LeisureDetail;
