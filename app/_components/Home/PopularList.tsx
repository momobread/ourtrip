import { JSX, ReactNode } from 'react';

interface PopularLocationProps {
  title: string;
  render?: ReactNode;
}
const PopularLocation = ({ title, render }: PopularLocationProps): JSX.Element => {
  // const data = usePreImg();
  return (
    <div className="px-[1rem] py-[5rem]">
      <div className="mb-[3rem] text-center text-[2.5rem] font-bold">{title}</div>
      <div>
        <ul className="flex items-center justify-center gap-[2.5rem]">{render}</ul>
      </div>
    </div>
  );
};
export default PopularLocation;
