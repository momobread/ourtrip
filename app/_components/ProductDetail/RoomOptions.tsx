import { differenceInDays } from 'date-fns';

import CustomDate from '@/app/_components/CustomDate';
import Room from '@/app/_components/ProductDetail/Room';
import { RoomType } from '@/app/_lib/types/product';

interface RoomOptionsProps {
  data: RoomType[];
  date: { checkIn: string; checkOut: string };
}

const RoomOptions = async ({ data, date }: RoomOptionsProps) => {
  const { checkIn, checkOut } = date;
  const stayDays = differenceInDays(checkOut, checkIn);
  return (
    <div className="flex flex-col items-center">
      <div className="w-[65%]">
        <CustomDate />
        <span className='font-bold text-[2.5rem] my-[1rem] inline-block'>객실선택</span>
        <div className="w-full bg-slate-100 rounded-lg p-[1rem] ">
          {date.checkIn} ~ {date.checkOut}
          <p>
            선택된 숙박기간은
            <span className="text-amber-400 font-bold"> {stayDays}일</span> 입니다
          </p>
        </div>
        <ul className="my-[2rem] flex flex-col gap-[1rem]">
          {data.map((room) => (
            <Room key={room.id} room={room} stayDays={stayDays} date={date} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomOptions;
