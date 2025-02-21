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
    <li className="flex">
      <div className="relative h-[20rem] w-[40%]">
        <Image src={room_image} alt="hellio" fill />
      </div>
      <div className="w-[60%] p-[1rem]">
        <span>{room_name}</span>
        <p>
          <span>입실 {checkIn}</span>
          <span>퇴실 {checkOut}</span>
        </p>
        <p>
          <span>1박 : {priceFormat(room_price)}원</span>

          <span>
            {priceFormat(room_price * stayDays)}원 / {stayDays} 박
          </span>
        </p>
        <div className="w-full text-end">
          <button className="bg-white">예약하기</button>
        </div>
      </div>
    </li>
  );
};
export default Room;
