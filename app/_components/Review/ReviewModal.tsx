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
        <div id="modal_contents" className="overflow-y-scroll">
          {!data ? (
            <p>리뷰가 없습니다</p>
          ) : (
            data.map((review, i) => <ReviewCard review={review} type="entire" key={i} />)
          )}
        </div>
        <button className="rounded-lg bg-slate-400 p-[2rem]" onClick={() => onClick(false)}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default ReviewModal;
