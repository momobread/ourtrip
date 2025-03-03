import { ReviewType } from '@/app/_lib/types/review';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect } from 'react';

interface ReviewCardProps {
  review: ReviewType;
  type: 'entire' | 'preview';
}

export default function ReviewCard({ review, type }: ReviewCardProps) {
  if (!review)
    return (
      <div>
        <p>등록된 리뷰가 없습니다</p>
      </div>
    );

  const { review_content, review_title, review_rate, review_img, created_at } = review;

  const previewformatDate = format(created_at, 'MM-dd');
  if (type === 'preview')
    return (
      <div className="flex w-[30rem] min-w-[48%] flex-col rounded-lg bg-slate-100 p-[1.5rem]">
        <div className="flex justify-between">
          <span className="inline-block"> {previewformatDate}</span>
          <span className="inline-block">{'⭐'.repeat(review_rate)}</span>
        </div>
        <p className="max-w-[95%] overflow-hidden text-ellipsis whitespace-nowrap">
          {review_content}
        </p>
      </div>
    );

  if (type === 'entire')
    return (
      <div className="flex flex-col gap-[1rem] rounded-lg border-b border-slate-400 p-[1.5rem]">
        {!review_img || review_img?.length === 0 ? <p></p> : <div>이미지가 나로</div>}
        <span>{review_title}</span>
        <span>{review_content}</span>
      </div>
    );
}
