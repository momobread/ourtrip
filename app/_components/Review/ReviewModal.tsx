import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { Dispatch, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import ReviewCard from '@/app/_components/Review/ReviewCard';
import { ReviewType } from '@/app/_lib/types/review';

interface ReviewModalProps {
  data: ReviewType[];
  onClick: Dispatch<React.SetStateAction<boolean>>;
  product_num: string;
  flag: string;
}
function ReviewModal({ data, onClick, product_num, flag }: ReviewModalProps) {
  const { data: user } = useSession();
  const [isIdExist, setIdExist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleWriteButton = () => {
    if (!user?.user) {
      setIdExist(true);
      return;
    }
    setIsLoading(true);
    console.log(flag);
    // if (!flag) {
    if (flag) { //이부분 flag가 다 같은부분을 바라보고 있어서 수정 필요함
      router.replace(`/review/post/${product_num}`);
    } else {
      //재진행
    }
  };
  return (
    <div id="overlay" className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/50">
      <div className="absolute left-2/4 top-[5%] flex h-[60rem] w-[80rem] -translate-x-2/4 flex-col rounded-lg bg-white">
        <div id="modal_contents" className="min-h-[53rem] overflow-y-scroll">
          <div className="flex flex-col items-center gap-[1rem] py-[4rem]">
            {isIdExist && <div className="text-[2rem] font-bold text-myred-400">로그인하세요</div>}
            {isLoading ? (
              <ClipLoader size={24} />
            ) : (
              <div
                id="review_write_icon_wrap"
                className="flex w-[90%] items-center justify-end font-bold"
              >
                글쓰기
                <p className="review_write_icon" onClick={() => handleWriteButton()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-20 hover:cursor-pointer"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                </p>
              </div>
            )}
            {!data ? (
              <p className="font-bold">리뷰가 없습니다</p>
            ) : (
              data.map((review, i) => (
                <ReviewCard
                  review={review}
                  type="entire"
                  key={i}
                  // @ts-expect-error idid
                  uuid={user?.user?.id}
                  // product_num={product_num}
                />
              ))
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
