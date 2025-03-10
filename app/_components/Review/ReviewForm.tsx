'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

import CustomRate from '@/app/_components/CustomRate';
import { ReviewType, ReviewWriteType } from '@/app/_lib/types/review';

const InputStyle = 'w-[90%] rounded-xl border border-accent-500 p-[1rem] ';

interface ReviewFormProps {
  product_num?: string;
  review?: ReviewType;
}

function ReviewForm({ product_num, review }: ReviewFormProps) {
  const { data } = useSession();
  const userName = data?.user?.name ?? '';
  // @ts-expect-error sdsdsd
  const uuid = data?.user?.id ?? '';
  const router = useRouter();

  const { handleSubmit, register } = useForm<ReviewWriteType>({
    defaultValues: review
      ? { content: review?.review_content, title: review?.review_title }
      : { content: '' },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rateValue, setRateValue] = useState<number>(0);

  const handleSubmitForm = async (data: ReviewWriteType) => {
    setIsLoading(true);

    const imageFile = data?.image?.[0];
    const formData = new FormData();

    if (review) {
      formData.append('review_img', imageFile);
      formData.append('review_title', data?.title);
      formData.append('review_content', data?.content);
      formData.append('review_rate', `${rateValue}`);
      formData.append('id', `${review?.id}`);
    } else if (product_num) {
      formData.append('review_img', imageFile);
      formData.append('review_title', data?.title);
      formData.append('review_content', data?.content);
      formData.append('review_user', uuid);
      formData.append('product_num', product_num);
      formData.append('review_rate', `${rateValue}`);
    }

    try {
      // 리뷰 post edit 분별필요
      const reviewWriteResponse = await axios.post(
        `/api/review/${review ? 'edit' : 'post'}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (reviewWriteResponse?.data?.status === 'success') {
        router.back();
      } else {
        console.log('리뷰등록에 실패하였습미다'); //야기서 부터 수정해주세요요.그리고 파일이 널일때 수정해주세요
      }
    } catch (e) {
      //@ts-expect-error e==unknown
      console.log('에러', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex w-[80rem] flex-col items-center gap-[0.5rem] bg-red-200 py-[3rem]"
    >
      <input value={userName} disabled={true} className={InputStyle} />
      <input
        type="text"
        placeholder="제목을 입력하세요"
        className={InputStyle}
        {...register('title')}
      />
      <textarea
        maxLength={300}
        placeholder="내용을 입력하세요. 내용은 최대 300자 까지 가능합니다."
        className="h-[40rem] w-[90%] resize-none rounded-xl border border-accent-500 p-[1rem]"
        {...register('content')}
      />
      <CustomRate setRateValue={setRateValue} />
      <input
        type="file"
        placeholder="첨부파일은 최대 1개까지만 가능합니다"
        className={InputStyle}
        {...register('image')}
      />
      <button
        disabled={isLoading}
        type="submit"
        className="rounded-lg bg-slate-100 px-[3rem] py-[1rem]"
      >
        {isLoading ? <ClipLoader size={12} /> : '작성하기'}
      </button>
    </form>
  );
}
export default ReviewForm;
