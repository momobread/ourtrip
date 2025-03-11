'use client';

import ListCard from '@/app/_components/Leisure/ListCard';
import { LeisureType } from '@/app/_lib/types/leisure';

interface LeisureList {
  datas: LeisureType[];
  category: string;
  title: string;
}

const LeisureList = ({ datas, category, title }: LeisureList) => {
  return (
    <div className="mt-[3rem] flex w-full flex-col items-center justify-center sm:h-[42rem]">
      <div className="my-[1rem] flex h-[7rem] w-[95%] items-center justify-center text-[2.5rem] font-bold">
        {title}
      </div>
      <ul className="flex w-[95%] flex-col items-center justify-center gap-[3rem] pb-[2rem] sm:flex-row">
        {datas?.map((data: LeisureType) => (
          <ListCard data={data} key={data?.leisure_num} category={category} />
        ))}
      </ul>
    </div>
  );
};
export default LeisureList;
