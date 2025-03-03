import { ReviewType } from '@/app/_lib/types/review';
import React, { Dispatch, ReactNode } from 'react';
import ReviewCard from './ReviewCard';

interface ReviewModalProps {
  data: ReviewType[];
  onClick: Dispatch<React.SetStateAction<boolean>>;
}
function ReviewModal({ data, onClick }: ReviewModalProps) {
  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/50" id="overlay">
      <div className="absolute left-2/4 top-[10%] flex h-[50rem] w-[80rem] -translate-x-2/4 flex-col bg-white">
        <div id="modal_contents" className="min-h-[43rem] overflow-y-scroll">
          <div className="flex flex-col items-center gap-[1rem] py-[4rem]">
            {!data ? (
              <p className="font-bold">리뷰가 없습니다</p>
            ) : (
              data.map((review, i) => <ReviewCard review={review} type="entire" key={i} />)
            )}
          </div>
        </div>
        <button
          className="rounded-lg bg-slate-200 p-[2rem] text-[2rem] font-bold"
          onClick={() => onClick(false)}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default ReviewModal;
