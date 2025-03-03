'use client';

import { useState } from 'react';
import { ReviewType } from '@/app/_lib/types/review';
import ReviewModal from './ReviewModal';
import ReviewCard from './ReviewCard';
import { useSession } from 'next-auth/react';

interface PreviewReviewProps {
  reviewData: ReviewType[];
}

const PreviewReview = ({ reviewData }: PreviewReviewProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);

  const previewReview = reviewData?.slice(0, 2);
  const reviewCount = reviewData?.length;
  const reviewAverage =
    reviewData?.reduce((acc, cur) => {
      return acc + cur.review_rate;
    }, 0) / reviewCount;
  return (
    <div className="flex h-[18rem] w-[50%] flex-col gap-[1rem] rounded-xl border border-slate-400 p-[1rem]">
      <div className="flex justify-between">
        <p>
          <span className="text-gray-500">
            평균 ⭐️{reviewAverage ? reviewAverage.toFixed(2) : 0}
          </span>
          <span> / </span>
          <span className="text-gray-500">리뷰 {reviewCount ? reviewCount : 0}명</span>
        </p>
        <button className="text-myred-300 ml-[1rem] font-bold" onClick={() => setIsClick(true)}>
          전체보기
        </button>
      </div>

      <div className="flex h-[75%] gap-[1rem]">
        {previewReview ? (
          previewReview?.map((review, i) => <ReviewCard review={review} type="preview" key={i} />)
        ) : (
          <ReviewCard review={previewReview} type="preview" />
        )}
      </div>
      {isClick && <ReviewModal data={reviewData} onClick={setIsClick} />}
    </div>
  );
};
export default PreviewReview;
