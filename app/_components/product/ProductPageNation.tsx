'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const PageButtonStyle = `
    inline-block h-[4rem] w-[3.5rem] rounded-md border border-primary-300 text-center leading-[3.5rem] font-semibold
`;
const NaviButtonStyle = `
     inline-block size-[4rem] p-[1rem]
`;

interface ProductPageNationProps {
  pages: number;
}

const ProductPageNation = ({ pages }: ProductPageNationProps) => {
  const pageList = Array.from({ length: pages }, (_, i) => {
    return i;
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeNavigateion = searchParams.get('page') ?? '1';

  const handleButton = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', `${page}`);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleNextButton = () => {
    const currentPage = Number(searchParams.get('page'));
    if (currentPage === pages) return;

    const params = new URLSearchParams(searchParams);
    params.set('page', `${currentPage + 1}`);
    router.replace(`${pathname}?${params.toString()}`);
  };
  const handlePreButton = () => {
    const currentPage = Number(searchParams.get('page'));
    if (currentPage === 1) return;

    const params = new URLSearchParams(searchParams);
    params.set('page', `${currentPage - 1}`);
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="mb-[20rem] flex gap-[0.5rem]">
      <button onClick={handlePreButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${NaviButtonStyle}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      {pageList.map((v) => (
        <a
          key={v + 1}
          className={`${PageButtonStyle} ${Number(activeNavigateion) === v + 1 ? 'bg-primary-100' : ''}`}
          onClick={() => handleButton(v + 1)}
        >
          {v + 1}
        </a>
      ))}

      <button onClick={handleNextButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${NaviButtonStyle}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};
export default ProductPageNation;
