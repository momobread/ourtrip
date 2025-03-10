import axios from 'axios';

import MainNav from '@/app/_components/layout/MainNav';
import DetailInform from '@/app/_components/ProductDetail/DetailInform';
import RoomOptions from '@/app/_components/ProductDetail/RoomOptions';

const NEXTURL = process.env.NEXTAUTH_URL;

interface PageProps {
  params: Promise<Record<string, string | undefined>>;
  searchParams: Promise<Record<string, string>>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const productId = (await params)?.motelId ?? '';
  const productDetailData = await axios.post(
    `${NEXTURL}/api/product/detail`,
    {
      product_num: productId,
    },
    {}
  );
  const productData = productDetailData?.data;
  const { product_lng, product_lat, product_name, PRODUCT_ROOMS, product_num, product_price } =
    productData;
  const marker = {
    id: 0,
    lat: product_lat,
    lng: product_lng,
    title: product_name,
    product_num,
    price: product_price,
  };
  const date = { checkIn: (await searchParams)?.checkIn, checkOut: (await searchParams)?.checkOut };
  return (
    <>
      <MainNav />
      <main className="">
        <section className="">
          <DetailInform data={productData} marker={marker} />
          <RoomOptions data={PRODUCT_ROOMS} date={date} />
        </section>
      </main>
    </>
    //
  );
};
export default page;
