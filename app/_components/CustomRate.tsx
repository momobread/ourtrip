'use client';

import { Dispatch, useState } from 'react';

interface CustomRateProps {
  setRateValue: Dispatch<React.SetStateAction<number>>;
}

const CustomRate = ({ setRateValue }: CustomRateProps) => {
  const [clickValue, setClickValue] = useState<number>(-1);
  const [isReset, setIsReset] = useState<boolean>(false);

  return (
    <div className="flex w-full items-center justify-center gap-[2rem]">
      <div>
        {[0, 1, 2, 3, 4].map((value, index) => (
          <button
            value={value}
            key={value}
            type="button"
            onClick={() => {
              setClickValue(index);
              setIsReset(true);
              setRateValue(value + 1);
            }}
            onMouseOut={!isReset ? () => setClickValue(index) : () => {}}
            disabled={!isReset ? false : true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={index <= clickValue ? '#9290C3' : '#00000'}
              className="size-12 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ))}
      </div>
      <button
        className="rounded-lg bg-white px-[3rem] py-[1.5rem]"
        type="button"
        onClick={() => {
          setIsReset(false);
          setClickValue(-1);
        }}
      >
        초기화
      </button>
    </div>
  );
};
export default CustomRate;
