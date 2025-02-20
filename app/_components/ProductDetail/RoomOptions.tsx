import Image from 'next/image';
import CustomDate from '../CustomDate';
import { RoomType } from '@/app/_lib/types/product';
import Room from './Room';
import { differenceInDays } from 'date-fns';

interface RoomOptionsProps {
  data: RoomType[];
  date: { checkIn: string; checkOut: string };
}

const RoomOptions = async ({ data, date }: RoomOptionsProps) => {
  const { checkIn, checkOut } = date;
  const stayDays = differenceInDays(checkOut, checkIn);
  return (
    <div className="flex flex-col items-center bg-slate-300">
      <div className="w-[60%]">
        <span>객실선택</span>
        <CustomDate />
        <div className="w-full border border-primary-800">
          {date.checkIn} ~ {date.checkOut}
          <p>
            선택된 숙박기간은
            <span className="text-primary-200"> {stayDays}일</span> 입니다
          </p>
        </div>
        <ul className="my-[1rem] flex flex-col gap-[1rem]">
          {data.map((room) => (
            <Room key={room.id} room={room} stayDays={stayDays} date={date} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomOptions;
