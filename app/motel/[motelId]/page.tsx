import axios from 'axios';

import DetailInform from '@/app/_components/ProductDetail/DetailInform';
import { fetchProduct } from '@/app/api/product/product';
import MainNav from '@/app/_components/layout/MainNav';
import RoomOptions from '@/app/_components/ProductDetail/RoomOptions';

const page = async ({ params }) => {
  const productId = (await params?.motelId) ?? '';
  const productData = await fetchProduct(productId);
  //   const { productData } = await axios.get('/api/product/detail', {
  //     params: { itemNum: productId },
  //   });

  //   const productData = await axios.get('/api/product/detail');

  return (
    <>
      <MainNav />
      <main className="">
        <section className="">
          <DetailInform data={productData} />
          <RoomOptions />
        </section>
      </main>
    </>
  );
};
export default page;
