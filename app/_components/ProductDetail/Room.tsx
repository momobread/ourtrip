import Image from 'next/image';
import { RoomType } from '@/app/_lib/types/product';

interface RoomProps {
  room: RoomType;
}
const Room = ({ room }: RoomProps) => {
  const { room_image, room_name, room_price } = room;
  return (
    <div>
      <div className="relative h-[20rem] w-[40%]">
        <Image src={room_image} alt="hellio" fill />
      </div>
      <div>
        <span>{room_name}</span>
        <p>
          <span>입실 13</span>
          <span>퇴실 15</span>
        </p>
        <span>가격 : {room_price} * 몇박</span>
      </div>
    </div>
  );
};
export default Room;
