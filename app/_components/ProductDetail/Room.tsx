import Image from 'next/image';

import { RoomType } from '@/app/_lib/types/product';
import { priceFormat } from '@/app/_lib/utils/format';

interface RoomProps {
  room: RoomType;
  stayDays: number;
  date: { checkIn: string; checkOut: string };
}
const Room = ({ room, stayDays, date }: RoomProps) => {
  const { checkIn, checkOut } = date;
  const { room_image, room_name, room_price } = room;
  return (
    <li className="flex flex-col gap-[1rem] rounded-xl bg-slate-100 p-[2rem] sm:flex-row sm:gap-0">
      <div className="relative h-[25rem] w-full sm:w-[40%]">
        <Image src={room_image} alt="hellio" fill className="rounded-xl" />
      </div>
      <div className="w-full sm:w-[60%] sm:px-[2rem]">
        <div className="rounded-xl bg-white p-[1rem]">
          <span className="text-[2rem] font-bold">{room_name}</span>
          <p>
            <span className="text-[1.5rem] sm:text-[2rem]">입실 {checkIn}</span>
            <span className="text-[1.5rem] sm:text-[2rem]">퇴실 {checkOut}</span>
          </p>
          <p className="flex flex-col">
            <span className="text-[1.5rem] sm:text-[2rem]">1박 / {priceFormat(room_price)}원</span>
            <span className="text-[1.5rem] text-primary-200 sm:text-[2rem]">
              {priceFormat(room_price * stayDays)}원 / {stayDays} 박
            </span>
          </p>
        </div>
        <div className="mt-[2rem] w-full text-end">
          <button className="rounded-xl bg-primary-300 px-[3rem] py-[1rem] text-white">
            예약하기
          </button>
        </div>
      </div>
    </li>
  );
};
export default Room;
