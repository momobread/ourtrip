import { JSX } from 'react';
import EventCard from './EventCard';

const EventPrivew = (): JSX.Element => {
  return (
    <div className="mb-[5rem] flex justify-center">
      <div className="flex gap-[2rem] px-[5rem] py-[1rem]">
        <EventCard
          img="/bg2.jpg"
          title="매일매일 출석체크"
          content="매일매일 출석체크를 통해 포인트와 선물을 받아요"
        />
        <EventCard
          img="/bg.jpeg"
          title="랜덤 쿠폰 팩"
          content="랜덤 쿠폰팩으로 원래 가격보다 훨씬 저렴하게 예약하자~"
        />
        <EventCard title="천원의 행복" content="확률싸움을 시작하지. 천원으로 숙소 예약하자" />
        {/* <EventCard title="퀴즈" content="퀴즈를 풀면 혜택이 주어진다구? 이건 꼭 해야돼!" /> */}
      </div>
    </div>
  );
};

export default EventPrivew;
