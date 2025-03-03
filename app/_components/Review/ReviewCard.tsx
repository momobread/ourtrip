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

  const { review_content, review_title, review_rate, review_img, created_at, review_user, USER } =
    review;

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

  if (type === 'entire') {
    const formattedImg = !review_img || review_img?.length === 0 ? '' : review_img?.split(',');
    console.log(formattedImg);
    return (
      <div className="flex w-[90%] flex-col rounded-lg border border-slate-400 p-[1.5rem]">
        <div>
          <span className="mr-[1rem] text-slate-500">{USER ? USER.user_name : '미상'}</span>
          <span>{'⭐'.repeat(review_rate)}</span>
          <p className="mr-4 font-bold">{review_title}</p>
        </div>
        <span>{review_content}</span>
        {!review_img || review_img?.length === 0 ? (
          <p></p>
        ) : (
          <div className="flex gap-[0.5rem]">
            {formattedImg?.map((review, i) => (
              <div className="relative h-[10rem] w-[15rem] object-cover" key={review + i}>
                <Image alt="review_hello" src={review} fill className="rounded-lg" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
