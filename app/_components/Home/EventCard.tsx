import { JSX } from 'react';

interface EventCardProps {
  title: string;
  img?: string;
  content: string;
}

const EventCard = ({ title, img, content }: EventCardProps): JSX.Element => {
  return (
    <div className="flex h-[22rem] w-[50rem] items-center justify-center gap-12 rounded-xl bg-primary-200">
      <div id="event_pre_text_wrap">
        <span className="text-[2.5rem] font-semibold">{title}</span>
        <p className="my-4 text-[1.8rem]">{content}</p>
      </div>
      {img && <img className="h-[15rem] w-[15rem] rounded-[25rem]" src={img} />}
    </div>
  );
};
export default EventCard;
