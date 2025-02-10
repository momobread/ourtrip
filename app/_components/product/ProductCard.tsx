import Image from 'next/image';

import { ProductType } from '@/app/_lib/types/product';
import { priceFormat } from '@/app/_lib/utils/format';

const ProductCard = ({ data }: { data: ProductType }) => {
  console.log(data);
  const { product_content, product_liked, product_name, product_price, product_img } = data;
  // console.log(product_category);
  return (
    <div className="relative flex h-[45rem] w-[30rem] flex-col items-center justify-center border border-primary-200">
      <p className="absolute right-[1rem] top-[1rem] z-30 flex">
        <span>{product_liked}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-12 text-accent-500"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      </p>
      <div className="relative h-[37rem] w-[30rem]">
        <Image src={product_img} alt="hotelimage" fill />
      </div>
      <span className="text-[2rem] font-semibold">{product_name}</span>
      <p>{product_content}</p>
      <span>{priceFormat(product_price)}원</span>
    </div>
  );
};
export default ProductCard;
