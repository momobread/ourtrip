import axios from 'axios';

import MainNav from '@/app/_components/layout/MainNav';
import MapForm from '@/app/_components/product/MapForm';
import ProductList from '@/app/_components/product/ProductList';
import ProductOptions from '@/app/_components/product/ProductOptions';
import ProductPageNation from '@/app/_components/product/ProductPageNation';
// import CustomMap from '@/app/_components/CustomMap';
import SideNav from '@/app/_components/product/SideNav';
import { GoogleMapMarkerType } from '@/app/_lib/types/params';
import { ProductType } from '@/app/_lib/types/product';

interface pageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}
const NEXTURL = process.env.NEXTAUTH_URL;

const page = async ({ searchParams }: pageProps) => {
  const filter = (await searchParams).filter ?? 'low_price';
  const currentPage = (await searchParams).page ?? '1';
  const itemPerPage = (await searchParams).count ?? '12';
  const location = (await searchParams).location ?? '서울';

  const productResponse = (await axios.post(
    `${NEXTURL}/api/product/list`,
    {
      filter,
      category: '1', //큰 카테코리
      itemPerPage, //보여줄 갯수
      currentPage, //현재페이지
      location,
    },
    {}
  )) as { data: { productData: ProductType[]; totalItems: number; totalPages: number } };
  const { productData, totalItems, totalPages } = productResponse?.data;

  const mapResponse = await axios.post(
    `${NEXTURL}/api/home/popular`,
    {
      filterLocation: location,
      category: '1',
    },
    {}
  );
  const mapData = mapResponse?.data;

  const markers: GoogleMapMarkerType[] = mapData.map((data: ProductType, i: number) => {
    return {
      id: i,
      lat: data.product_lat,
      lng: data.product_lng,
      title: data.product_name,
      product_num: data.product_num,
      price: data.product_price,
    };
  });

  return (
    <>
      <MainNav />
      <main className="h-full w-full">
        <section className="h-full">
          <div className="mt-[1rem] flex h-full flex-col items-center">
            <MapForm
              formStyle={`sm:w-[40%] w-full h-[100%] border border-gray-400 rounded-xl sm:rounded-none `}
              markers={markers}
            />
            <div className="mt-[2rem] flex w-[100%] flex-col items-end">
              <ProductOptions />
              <SideNav totalItems={totalItems} />
            </div>

            <ProductList productData={productData} category="motel" />
            <ProductPageNation pages={totalPages} />
          </div>
        </section>
      </main>
    </>
  );
};
export default page;
