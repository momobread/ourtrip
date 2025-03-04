import { ReviewType } from '@/app/_lib/types/review';
import React, { Dispatch, ReactNode, useState } from 'react';
import ReviewCard from './ReviewCard';
import { useSession } from 'next-auth/react';
import CustomModal from '../CustomModal';
import { useRouter, useSearchParams } from 'next/navigation';

interface ReviewModalProps {
  data: ReviewType[];
  onClick: Dispatch<React.SetStateAction<boolean>>;
  product_num: string;
}
function ReviewModal({ data, onClick, product_num }: ReviewModalProps) {
  const { data: user } = useSession();
  const [isClick, setIsClick] = useState<boolean>(false);
  const router = useRouter();

  console.log(user);
  const handleWriteButton = () => {
    if (!user?.user) {
      setIsClick(true);
      return;
    }
    router.replace(`/review/${product_num}`);
  };
  return (
    <div id="overlay" className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/50">
      <div className="absolute left-2/4 top-[5%] flex h-[60rem] w-[80rem] -translate-x-2/4 flex-col rounded-lg bg-white">
        <div id="modal_contents" className="min-h-[53rem] overflow-y-scroll">
          <div className="flex flex-col items-center gap-[1rem] py-[4rem]">
            {isClick && <div className="text-[2rem] font-bold text-myred-400">로그인하세요</div>}
            <div
              id="review_write_icon_wrap"
              className="flex w-[90%] items-center justify-end font-bold"
            >
              글쓰기
              <p className="review_write_icon" onClick={() => handleWriteButton()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-20 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </p>
            </div>
            {!data ? (
              <p className="font-bold">리뷰가 없습니다</p>
            ) : (
              data.map((review, i) => <ReviewCard review={review} type="entire" key={i} />)
            )}
          </div>
        </div>
        <button
          className="rounded-lg bg-primary-300 p-[2rem] text-[2rem] font-bold"
          onClick={() => onClick(false)}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default ReviewModal;
