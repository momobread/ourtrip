import { JSX } from 'react';

interface EventCardProps {
  title: string;
  img?: string;
  content: string;
}

const EventCard = ({ title, img, content }: EventCardProps): JSX.Element => {
  return (
    <div className=" flex items-center justify-center gap-12 rounded-xl bg-primary-200 sm:h-[22rem] sm:w-[40rem] 2xl:h-[22rem] 2xl:w-[50rem]">
      <div id="event_pre_text_wrap">
        <span className="text-[2.5rem] font-semibold">{title}</span>
        <p className="my-4 text-[1.8rem]">{content}</p>
      </div>
      {img && <img className="h-[15rem] w-[15rem] rounded-[25rem]" src={img} />}
    </div>
  );
};
export default EventCard;
