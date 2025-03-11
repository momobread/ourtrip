import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { deleteReviewAction } from '@/app/_components/Review/deleteReviewAction';
import { ReviewType } from '@/app/_lib/types/review';

interface ReviewCardProps {
  review: ReviewType;
  type: 'entire' | 'preview';
  uuid?: string;
}

export default function ReviewCard({ review, type, uuid }: ReviewCardProps) {
  const [isClickDelete, setIsClickDelete] = useState<boolean>(false);
  const [isClickEdit, setIsClickEdit] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isClickDelete && !isClickEdit) return;

    async function deleteReview() {
      try {
        await deleteReviewAction(id);
      } catch (e) {
        console.log(e);
      } finally {
        setIsClickDelete(false);
      }
    }

    async function editReview() {
      router.replace(`/review/edit/${id}`);
    }

    if (isClickDelete) deleteReview();
    if (isClickEdit) editReview();
    setIsClickEdit(false);
  }, [isClickDelete, isClickEdit]);

  if (!review)
    return (
      <div>
        <p>등록된 리뷰가 없습니다</p>
      </div>
    );

  const {
    review_content,
    review_title,
    review_rate,
    review_img,
    created_at,
    review_user,
    USER,
    id,
  } = review;
  const previewformatDate = format(created_at, 'MM-dd');

  if (type === 'preview') {
    return (
      <div className="flex min-w-[48%] flex-col rounded-lg bg-slate-100 p-[1.5rem] sm:w-[30rem]">
        <div className="flex justify-between">
          <span className="inline-block"> {previewformatDate}</span>
          <span className="inline-block">{'⭐'.repeat(review_rate)}</span>
        </div>
        <p className="max-w-[95%] overflow-hidden text-ellipsis whitespace-nowrap">
          {review_content}
        </p>
      </div>
    );
  } else if (type === 'entire') {
    console.log(uuid);
    const formattedImg = !review_img || review_img?.length === 0 ? '' : review_img?.split(',');

    if (isClickDelete) return <ClipLoader size={20} />;
    return (
      <div className="relative flex w-[90%] flex-col rounded-lg border border-slate-400 p-[1.5rem]">
        {uuid === review_user ? (
          <div className="absolute right-[2rem]">
            <button id="trashIcon" type="button" onClick={() => setIsClickDelete(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-[0.5rem] size-12"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button onClick={() => setIsClickEdit(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-12"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            </button>
          </div>
        ) : (
          ''
        )}
        <div>
          <span className="mr-[1rem] text-slate-500">{USER ? USER.user_name : '미상'}</span>
          <span className="mr-[1rem]">{previewformatDate}</span>
          <span>{'⭐'.repeat(review_rate)}</span>
          <p className="mr-4 font-bold">{review_title}</p>
        </div>
        <span>{review_content}</span>
        {formattedImg === '' ? (
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
  } else {
    return;
  }
}
