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
      {data?.length > 3 ? (
        <div className="w-screen sm:w-[65%]">
          <CustomDate />
          <span className="my-[1rem] inline-block p-[1rem] text-[2.5rem] font-bold sm:p-0">
            객실선택
          </span>
          <div className="w-full rounded-lg bg-slate-100 p-[1rem] text-[1.5rem] sm:text-[2rem]">
            {date.checkIn} ~ {date.checkOut}
            <p>
              선택된 숙박기간은
              <span className="font-bold text-amber-400"> {stayDays}일</span> 입니다
            </p>
          </div>

          <ul className="my-[2rem] flex flex-col gap-[1rem]">
            {data.map((room) => (
              <Room key={room.id} room={room} stayDays={stayDays} date={date} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-screen sm:w-[65%]">
          <CustomDate />
          <span className="my-[1rem] inline-block p-[1rem] text-[2.5rem] font-bold sm:p-0">
            객실선택
          </span>
          <div className="w-full rounded-lg bg-slate-100 p-[1rem] text-[1.5rem] sm:text-[2rem]">
            {date.checkIn} ~ {date.checkOut}
            <p>
              선택된 숙박기간은
              <span className="font-bold text-amber-400"> {stayDays}일</span> 입니다
            </p>
          </div>

          <ul className="my-[2rem] flex flex-col gap-[1rem]">
            <Room room={data?.[0]} stayDays={stayDays} date={date} />
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoomOptions;
