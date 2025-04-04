'use client';

import { useState } from 'react';

import ReviewCard from '@/app/_components/Review/ReviewCard';
import ReviewModal from '@/app/_components/Review/ReviewModal';
import { ReviewType } from '@/app/_lib/types/review';

interface PreviewReviewProps {
  reviewData: ReviewType[];
  product_num: string;
  style?: string;
}

const PreviewReview = ({ reviewData, product_num, style }: PreviewReviewProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const previewReview = reviewData?.slice(0, 2);
  const reviewCount = reviewData?.length;
  const reviewAverage =
    reviewData?.reduce((acc, cur) => {
      return acc + cur.review_rate;
    }, 0) / reviewCount;

  return (
    <div
      className={`flex flex-col gap-[1rem] rounded-xl border border-slate-400 p-[1rem] sm:overflow-auto ${style ? style : 'h-fit sm:h-[18rem] sm:w-[50%]'} `}
    >
      <div className="flex justify-between">
        <p>
          <span className="text-gray-500">
            평균 ⭐️{reviewAverage ? reviewAverage.toFixed(2) : 0}
          </span>
          <span> / </span>
          <span className="text-gray-500">리뷰 {reviewCount ? reviewCount : 0}명</span>
        </p>
        <button className="ml-[1rem] font-bold text-myred-300" onClick={() => setIsClick(true)}>
          전체보기
        </button>
      </div>

      <div className="flex h-[75%] flex-col gap-[1rem] sm:flex-row">
        {previewReview ? (
          previewReview?.map((review, i) => <ReviewCard review={review} type="preview" key={i} />)
        ) : (
          <ReviewCard review={previewReview} type="preview" />
        )}
      </div>
      {isClick && (
        <ReviewModal
          data={reviewData}
          onClick={setIsClick}
          product_num={product_num}
          flag="leisrue"
        />
      )}
    </div>
  );
};
export default PreviewReview;
