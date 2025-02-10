import ProductList from '../_components/product/ProductList';
import SideNav from '../_components/product/SideNav';
import GooleMapFilter from '../_components/product/GooleMapFilter';
import { usePathname } from 'next/navigation';
import Loader from '../_components/Loader';
import { fetchProducts } from '../_lib/product';

const page = async ({ searchParams }) => {
  const filter = (await searchParams).filter ?? 'all';
  const productData = await fetchProducts({ filter: filter, category: 1 });
  console.log(productData);
  return (
    <section className="h-full">
      <div className="flex flex-col items-center">
        {/* 지도필터 먼저 띄우고, 서울을 기준으로 안내, 그리고 버튼 누르면 내위치 기준으로 안내 */}
        <SideNav />
        <ProductList productData={productData} />
      </div>
    </section>
  );
};
export default page;
