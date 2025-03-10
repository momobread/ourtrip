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
    <div className="mb-[1rem] flex gap-5 px-[2rem] py-[0.5rem]">
      <button
        onClick={() => handleFilter('12')}
        className={`rounded-3xl px-[1.5rem] py-[0.5rem] text-[2rem] ${activeFilter === '12' ? 'bg-primary-200 font-extrabold' : 'border-grey-250 border'}`}
      >
        12개씩 보기
      </button>
      <button
        onClick={() => handleFilter('16')}
        className={`rounded-3xl px-[1.5rem] py-[0.5rem] text-[2rem] ${activeFilter === '16' ? 'bg-primary-200 font-extrabold' : 'border-grey-250 border'}`}
      >
        16개씩 보기
      </button>
      <button
        onClick={() => handleFilter('20')}
        className={`rounded-3xl px-[1.5rem] py-[0.5rem] text-[2rem] ${activeFilter === '20' ? 'bg-primary-200 font-extrabold' : 'border-grey-250 border'}`}
      >
        20개씩 보기
      </button>
    </div>
  );
};
export default ProductOptions;
