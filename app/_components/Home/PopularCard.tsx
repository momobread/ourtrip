import Image from 'next/image';
import { JSX } from 'react';

interface PopularCardType {
  img: string;
  title: string;
  size?: string;
}

const PopularCard = ({ img, title, size }: PopularCardType): JSX.Element => {
  //제주도 부산 인천  서울 경주 대구

  return (
    <li
      className={`flex flex-col rounded-lg ${size === 'medium' ? 'h-[35rem] w-[90%] sm:w-[25rem] 2xl:h-[42rem] 2xl:w-[30rem]' : 'h-[35rem] w-[90%] sm:h-[30rem] sm:w-[22rem] 2xl:h-[30rem] 2xl:w-[25rem]'}`}
    >
      <div
        className={`relative ${size === 'medium' ? 'h-[32rem] w-[100%] sm:w-[25rem] 2xl:h-[37rem] 2xl:w-[30rem]' : 'h-[32rem] w-[100%] sm:h-[25rem] sm:w-[22rem] 2xl:h-[25rem] 2xl:w-[25rem]'}`}
      >
        <Image src={img} fill alt="pre_img" className={`rounded-xl`} />
      </div>
      <span className="text-[2rem] font-semibold">{title}</span>
    </li>
  );
};
export default PopularCard;
