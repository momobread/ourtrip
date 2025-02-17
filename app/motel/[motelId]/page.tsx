import axios from 'axios';

import DetailInform from '@/app/_components/ProductDetail/DetailInform';
import { fetchProduct } from '@/app/api/product/product';
import MainNav from '@/app/_components/layout/MainNav';
import RoomOptions from '@/app/_components/ProductDetail/RoomOptions';

const page = async ({ params }) => {
  const productId = (await params?.motelId) ?? '';
  const productData = await fetchProduct(productId);

  const { product_lng, product_lat, product_name } = productData;

  const marker = { id: 0, lat: product_lat, lng: product_lng, title: product_name };
  return (
    <>
      <MainNav />
      <main className="">
        <section className="">
          <DetailInform data={productData} marker={marker} />
          <RoomOptions />
        </section>
      </main>
    </>
  );
};
export default page;
