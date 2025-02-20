import axios from 'axios';

import DetailInform from '@/app/_components/ProductDetail/DetailInform';
import { fetchProduct } from '@/app/api/product/product';
import MainNav from '@/app/_components/layout/MainNav';
import RoomOptions from '@/app/_components/ProductDetail/RoomOptions';
import { fetchRooms } from '@/app/api/product/detail/route';

const page = async ({ params, searchParams }) => {
  const productId = (await params)?.motelId ?? '';
  const productData = await fetchProduct(productId);
  const { product_lng, product_lat, product_name, PRODUCT_ROOMS, product_num } = productData;
  const marker = { id: 0, lat: product_lat, lng: product_lng, title: product_name, product_num };
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
  );
};
export default page;
