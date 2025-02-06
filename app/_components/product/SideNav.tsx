import Link from 'next/link';

const SideNav = () => {
  return (
    <div className="">
      <ul className="flex w-[30rem] bg-accent-300">
        <li>낮은가격순</li>
        <li>높은가격순</li>
        <li>인기순</li>
        <li>최신순</li>
      </ul>
    </div>
  );
};
export default SideNav;
