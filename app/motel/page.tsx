import { Suspense } from 'react';
import Loader from '../_components/Loader';
import ProductList from '../_components/product/ProductList';
import SideNav from '../_components/product/SideNav';
import { fetchProducts } from '../_lib/product';
import ProductOptions from '../_components/product/ProductOptions';
import { pageNation } from '../_lib/pageNation';
import ProductPageNation from '../_components/product/ProductPageNation';

const page = async ({ searchParams }) => {
  const filter = (await searchParams).filter ?? 'all';
  const currentPage = (await searchParams).page ?? '1';
  const { productData, totalItems, totalPages } = await fetchProducts({
    filter,
    category: 1, //큰 카테코리
    itemPerPage: 5, //보여줄 갯수
    currentPage, //현재페이지
  });
  const pageNum = 0;
  // const { slideData, pageNum } = pageNation({ option: 5, productData });
  return (
    <section className="h-full">
      <div className="flex flex-col items-center">
        {/* 지도필터 먼저 띄우고, 서울을 기준으로 안내, 그리고 버튼 누르면 내위치 기준으로 안내 */}
        <div className="flex w-[90%] flex-col items-end bg-slate-200">
          <ProductOptions />
          {/* 파람에서 값 받아서 데이터 분할 */}
          <SideNav />
        </div>
        <ProductList productData={productData} pageNum={pageNum} />
        <ProductPageNation />
      </div>
    </section>
  );
};
export default page;
