import Image from 'next/image';

import CustomIcon from '@/app/_components/CustomIcon';
import Amenities from '@/app/_components/ProductDetail/Amenities';
import DetailLocation from '@/app/_components/ProductDetail/DetailLocation';
import PreviewReview from '@/app/_components/ProductDetail/PreviewReview';
import SessionWrapper from '@/app/_components/Session/SessionWrapper';
import { GoogleMapMarkerType } from '@/app/_lib/types/params';
import { ProductType, RoomType } from '@/app/_lib/types/product';
import { priceFormat } from '@/app/_lib/utils/format';

interface DetailInformProps {
  data: ProductType;
  marker: GoogleMapMarkerType;
}

const IconStyle = `absolute right-0 top-[2rem] flex`;

const DetailInform = ({ data, marker }: DetailInformProps) => {
  const { product_content, product_img, product_liked, product_name, product_price, product_num,PRODUCT_ROOMS } =
  data;
// const {} = PRODUCT_ROOMS as RoomType[];
  return (
    <div className="">
      <div className="flex flex-col items-center ]">
        <div className="h-[60rem] w-[64%] border-b border-grey-900 flex gap-[1%]">
          <div className='relative w-[50%] h-full'>
          <Image src={product_img} fill alt={`${product_num}`} />
          </div>
          <ul className='flex w-[50%] flex-wrap bg-slate-200 gap-[2%] justify-center items-center flex-1'>
          {PRODUCT_ROOMS?.map((room : RoomType)=>
          <li className='w-[49%]  relative h-[49%]'>
            <Image src={room.room_image} fill alt={`${room.room_image}`} key={room.room_image}/>
          </li>
          )}
          </ul>
        </div>
        <div className="relative my-[1rem] flex w-[64%] flex-col gap-[0.5rem]">
          <span className="text-[3.5rem] font-semibold">{product_name}</span>
          <div className="flex justify-between">
            <p>{product_content}</p>
            <span>{priceFormat(product_price)}원</span>
          </div>
          <SessionWrapper>
            <CustomIcon style={IconStyle} product_num={product_num} likeCount={product_liked}>
              <span>{product_liked}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-12 text-accent-500"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </CustomIcon>
          </SessionWrapper>

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
