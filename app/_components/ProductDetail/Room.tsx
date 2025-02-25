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
    <li className="flex bg-slate-100 p-[2rem] rounded-xl">
      <div className="relative h-[25rem] w-[40%] ">
        <Image src={room_image} alt="hellio" fill className='rounded-xl' />
      </div>
      <div className="w-[60%] px-[2rem]">
        <div className='bg-white p-[1rem] rounded-xl'>
        <span className='font-bold text-[2rem]'>{room_name}</span>
        <p>
          <span>입실 {checkIn}</span>
          <span>퇴실 {checkOut}</span>
        </p>
        <p className='flex flex-col'>
          <span>1박 / {priceFormat(room_price)}원</span>

          <span>
            {priceFormat(room_price * stayDays)}원 / {stayDays} 박
          </span>
        </p>
        </div>
        <div className="w-full text-end mt-[2rem]">
          <button className="bg-white p-[2rem]">예약하기</button>
        </div>
      </div>
    </li>
  );
};
export default Room;
