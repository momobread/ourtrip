'use client';

import { useState } from 'react';
import { ReviewType } from '@/app/_lib/types/review';
import ReviewModal from './ReviewModal';
import ReviewCard from './ReviewCard';

interface PreviewReviewProps {
  reviewData: ReviewType[];
}

const PreviewReview = ({ reviewData }: PreviewReviewProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const previewReview = reviewData?.slice(0, 2);
  return (
    <div className="flex h-[18rem] w-[50%] flex-col gap-[1rem] rounded-xl border border-slate-400 p-[1rem]">
      <div>
        <span>⭐️ 3.3</span>
        <span className="">xxxx명 평가 </span>

        <button className="ml-[1rem] text-red-300" onClick={() => setIsClick(true)}>
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
