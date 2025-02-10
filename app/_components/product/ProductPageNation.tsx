'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const PageButtonStyle = `
    inline-block h-[4rem] w-[3.5rem] rounded-md border border-primary-300 text-center leading-[3.5rem] font-semibold
`;
const NaviButtonStyle = `
     inline-block size-[4rem] p-[1rem]
`;

const ProductPageNation = ({ pages }) => {
  const pageList = Array.from({ length: pages }, (_, i) => {
    return i;
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleButton = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mb-[20rem] flex gap-[0.5rem] bg-slate-300">
      <button>
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
        <a key={v + 1} className={`${PageButtonStyle}`} onClick={() => handleButton(v + 1)}>
          {v + 1}
        </a>
      ))}
      {/* <a className={`${PageButtonStyle}`} onClick={() => handleButton(1)}>
        1
      </a>
      <a className={`${PageButtonStyle}`} onClick={() => handleButton(2)}>
        2
      </a>
      <a className={`${PageButtonStyle}`} onClick={() => handleButton(3)}>
        3
      </a>
      <a className={`${PageButtonStyle}`} onClick={() => handleButton(4)}>
        4
      </a>
      <a className={`${PageButtonStyle}`} onClick={() => handleButton(5)}>
        5
      </a> */}
      <button>
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
