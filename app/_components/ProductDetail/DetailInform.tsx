import Image from 'next/image';

import { ProductType } from '@/app/_lib/types/product';
import { priceFormat } from '@/app/_lib/utils/format';
import DetailLocation from '@/app/_components/ProductDetail/DetailLocation';
import PreviewReview from './PreviewReview';
import Amenities from './Amenities';

interface DetailInformProps {
  data: ProductType;
  marker: any;
}

const DetailInform = ({ data, marker }: DetailInformProps) => {
  const { product_content, product_img, product_liked, product_name, product_price, product_num } =
    data;
  return (
    <div className="bg-grey-50">
      <div className="flex flex-col items-center">
        <div className="relative h-[50rem] w-[60%] border-b border-grey-900">
          <Image src={product_img} fill alt={`${product_num}`} />
        </div>
        <div className="relative my-[1rem] flex w-[60%] flex-col gap-[0.5rem]">
          <span className="text-[3.5rem] font-semibold">{product_name}</span>
          <div className="flex justify-between">
            <p>{product_content}</p>
            <span>{priceFormat(product_price)}원</span>
          </div>
          <p className="absolute right-0 top-[2rem] flex">
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
          <DetailLocation marker={marker} />
          <div className="flex gap-[1rem]">
            <PreviewReview />
            <Amenities />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailInform;
