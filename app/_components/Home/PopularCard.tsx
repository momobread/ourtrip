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
      className={`flex flex-col rounded-lg ${size === 'medium' ? 'h-[42rem] w-[30rem]' : 'h-[30rem] w-[25rem]'}`}
    >
      <div
        className={`relative ${size === 'medium' ? 'h-[37rem] w-[30rem]' : 'h-[25rem] w-[25rem]'}`}
      >
        <Image src={img} fill alt="pre_img" className={`rounded-xl`} />
      </div>
      <span className="text-[2rem] font-semibold">{title}</span>
    </li>
  );
};
export default PopularCard;
