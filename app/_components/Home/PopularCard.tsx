import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';

interface PopularCardType {
  img: string;
  title: string;
  size?: string;
  href: string;
  tag: string;
}

const PopularCard = ({ img, title, size, href, tag }: PopularCardType): JSX.Element => {
  //제주도 부산 인천  서울 경주 대구

  return (
    <li
      className={`flex flex-col rounded-lg ${size === 'medium' ? 'h-[35rem] w-[90%] sm:w-[25rem] 2xl:h-[42rem] 2xl:w-[30rem]' : 'h-[35rem] w-[90%] sm:h-[30rem] sm:w-[20rem] 2xl:h-[30rem] 2xl:w-[25rem]'}`}
    >
      <Link href={`${tag === 'hotel' ? 'hotel/' : tag === 'guest' ? 'guest/' : 'leisure/'}${href}`}>
        <div
          className={`relative ${size === 'medium' ? 'h-[32rem] w-[100%] sm:w-[25rem] 2xl:h-[37rem] 2xl:w-[30rem]' : 'h-[32rem] w-[100%] sm:h-[20rem] sm:w-[20rem] 2xl:h-[25rem] 2xl:w-[25rem]'}`}
        >
          <Image src={img} fill alt="pre_img" className={`rounded-xl`} />
        </div>
        <span className="text-[2rem] font-semibold">{title}</span>
      </Link>
    </li>
  );
};
export default PopularCard;
