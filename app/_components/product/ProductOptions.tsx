'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ProductOptions = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeFilter = searchParams.get('count') ?? '12';

  const handleFilter = (count: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('count', count);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="mb-[1rem] flex w-full justify-center gap-5 px-[2rem] py-[0.5rem] sm:w-fit sm:justify-normal">
      <button
        onClick={() => handleFilter('12')}
        className={`rounded-md px-[1.5rem] py-[0.5rem] text-[1.2rem] sm:rounded-3xl sm:text-[2rem] ${activeFilter === '12' ? 'bg-primary-200 font-extrabold' : 'border border-grey-250'}`}
      >
        12개씩 보기
      </button>
      <button
        onClick={() => handleFilter('16')}
        className={`rounded-md px-[1.5rem] py-[0.5rem] text-[1.2rem] sm:rounded-3xl sm:text-[2rem] ${activeFilter === '16' ? 'bg-primary-200 font-extrabold' : 'border border-grey-250'}`}
      >
        16개씩 보기
      </button>
      <button
        onClick={() => handleFilter('20')}
        className={`rounded-md px-[1.5rem] py-[0.5rem] text-[1.2rem] sm:rounded-3xl sm:text-[2rem] ${activeFilter === '20' ? 'bg-primary-200 font-extrabold' : 'border border-grey-250'}`}
      >
        20개씩 보기
      </button>
    </div>
  );
};
export default ProductOptions;
