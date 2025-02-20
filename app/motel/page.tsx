import MainNav from '@/app/_components/layout/MainNav';
import ProductList from '@/app/_components/product/ProductList';
import ProductOptions from '@/app/_components/product/ProductOptions';
import ProductPageNation from '@/app/_components/product/ProductPageNation';
import SideNav from '@/app/_components/product/SideNav';
import { fetchProducts } from '@/app/api/product/product';
import CustomMap from '../_components/CustomMap';
import MapForm from '../_components/product/MapForm';

interface pageProps {
  searchParams: Record<string, string>;
}

// const markers = [
//   { id: 1, lat: 37.5665, lng: 126.978, title: '서울' },
//   { id: 2, lat: 37.7, lng: 126.978, title: '서울2' },
//   { id: 3, lat: 37.7, lng: 127.978, title: '서울3' },
//   { id: 4, lat: 37.6, lng: 127.878, title: '서울3' },
//   { id: 5, lat: 37.6, lng: 126.878, title: '서울3' },
//   { id: 6, lat: 37.8, lng: 126.878, title: '서울3' },
// ];

const page = async ({ searchParams }: pageProps) => {
  const filter = (await searchParams).filter ?? 'low_price';
  const currentPage = (await searchParams).page ?? '1';
  const itemPerPage = (await searchParams).count ?? '12';
  const location = (await searchParams).location ?? '서울';
  console.log(location);
  const { productData, totalItems, totalPages } = await fetchProducts({
    filter,
    category: '1', //큰 카테코리
    itemPerPage, //보여줄 갯수
    currentPage, //현재페이지
    location,
  });
  const markers = productData.map((data, i) => {
    return {
      id: i,
      lat: data.product_lat,
      lng: data.product_lng,
      title: data.product_name,
      product_num: data.product_num,
    };
  });
  return (
    <>
      <MainNav />
      <main className="h-full w-full">
        <section className="h-full">
          <div className="flex flex-col items-center">
            <MapForm formStyle={`w-[40%] h-[100%]`} markers={markers} />
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
