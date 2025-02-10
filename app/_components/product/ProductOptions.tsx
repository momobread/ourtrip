'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ProductOptions = () => {
  //쿼리스트링으로 값 올리고
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeFilter = searchParams.get('count') ?? '5';

  const handleFilter = (count: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('count', count);
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex gap-5 px-[2rem] py-[1rem]">
      <button
        onClick={() => handleFilter('5')}
        className={`text-[2rem] ${activeFilter === '5' ? 'font-extrabold text-primary-200' : ''}`}
      >
        5개씩 보기
      </button>
      <button
        onClick={() => handleFilter('10')}
        className={`text-[2rem] ${activeFilter === '10' ? 'font-extrabold text-primary-200' : ''}`}
      >
        10개씩 보기
      </button>
      <button
        onClick={() => handleFilter('20')}
        className={`text-[2rem] ${activeFilter === '20' ? 'font-extrabold text-primary-200' : ''}`}
      >
        20개씩 보기
      </button>
    </div>
  );
};
export default ProductOptions;
