import Link from 'next/link';
import Image from 'next/image';

import { LeisureType } from '@/app/_lib/types/leisure';
import { priceFormat } from '@/app/_lib/utils/format';

interface ListCardProps {
  data: LeisureType;
  category: string;
}

const ListCard = ({ data, category }: ListCardProps) => {
  const { leisure_content, leisure_img, leisure_name, leisure_price, leisure_num } = data;
  return (
    <li className="relative flex h-[32rem] w-[40rem] flex-col justify-center rounded-xl">
      <Link href={`/${category}/${leisure_num}`}>
        <div className="relative h-[24rem] w-[40rem] object-cover">
          <Image src={leisure_img} fill alt="leisure_img" className="rounded-xl" />
        </div>
      </Link>
      <div className="h-[8rem] px-[1rem] py-[1rem]">
        <div className="h-[3rem] font-bold">{leisure_content}</div>
        <div className="h-[3rem] font-bold">{priceFormat(leisure_price)}원</div>
      </div>
    </li>
  );
};
export default ListCard;
