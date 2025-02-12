import ProductList from '@/app/_components/product/ProductList';
import ProductOptions from '@/app/_components/product/ProductOptions';
import ProductPageNation from '@/app/_components/product/ProductPageNation';
import SideNav from '@/app/_components/product/SideNav';
import { fetchProducts } from '@/app/_lib/api/product';
import MainNav from '../_components/layout/MainNav';

interface pageProps {
  searchParams: Record<string, string>;
}

const page = async ({ searchParams }: pageProps) => {
  const filter = searchParams.filter ?? 'low_price';
  const currentPage = searchParams.page ?? '1';
  const itemPerPage = searchParams.count ?? '12';
  console.log(typeof currentPage);
  const { productData, totalItems, totalPages } = await fetchProducts({
    filter,
    category: '3', //큰 카테코리
    itemPerPage, //보여줄 갯수
    currentPage, //현재페이지
  });
  // const { slideData, pageNum } = pageNation({ option: 5, productData });
  return (
    <>
      <MainNav />
      <main className="h-full w-full">
        <section className="h-full">
          <div className="flex flex-col items-center">
            {/* 지도필터 먼저 띄우고, 서울을 기준으로 안내, 그리고 버튼 누르면 내위치 기준으로 안내 */}
            <div className="flex w-[90%] flex-col items-end bg-slate-200">
              <ProductOptions />
              <SideNav />
            </div>
            <div className="mt-[5rem] w-[90%]">검색결과 : {totalItems}개</div>
            <ProductList productData={productData} />
            <ProductPageNation pages={totalPages} />
          </div>
        </section>
      </main>
    </>
  );
};
export default page;
