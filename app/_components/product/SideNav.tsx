'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SideNavProps {
  totalItems: number;
}

const SideNav = ({ totalItems }: SideNavProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('filter') ?? 'low_price';
  const activestyle = `font-bold text-primary-400 border-b-4 border-primary-400`;
  const filterstyle = `w-[15rem] text-center text-[2rem] p-[1.2rem]`;

  const handleFilter = ({ value }: { value: string }) => {
    const params = new URLSearchParams(searchParams);
    params.set('filter', value);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };
  return (
    <div className="w-full bg-slate-200">
      <ul className="flex h-[6rem] w-full items-center justify-between">
        <div className="px-[3rem]">검색결과 : {totalItems}개</div>
        <div className="flex rounded-xl">
          <li
            onClick={() => handleFilter({ value: 'low_price' })}
            className={`${filterstyle} ${activeFilter === 'low_price' ? activestyle : 'font-medium'}`}
          >
            낮은가격순
          </li>
          <li
            onClick={() => handleFilter({ value: 'high_price' })}
            className={`${filterstyle} ${activeFilter === 'high_price' ? activestyle : 'font-medium'}`}
          >
            높은가격순
          </li>
          <li
            onClick={() => handleFilter({ value: 'best' })}
            className={`${filterstyle} ${activeFilter === 'best' ? activestyle : 'font-medium'}`}
          >
            인기순
          </li>
          <li
            onClick={() => handleFilter({ value: 'new' })}
            className={`${filterstyle} ${activeFilter === 'new' ? activestyle : 'font-medium'}`}
          >
            최신순
          </li>
        </div>
      </ul>
    </div>
  );
};
export default SideNav;
