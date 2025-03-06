import Image from 'next/image';

import CustomIcon from '@/app/_components/CustomIcon';
import Amenities from '@/app/_components/ProductDetail/Amenities';
import DetailLocation from '@/app/_components/ProductDetail/DetailLocation';
import PreviewReview from '@/app/_components/Review/PreviewReview';
import SessionWrapper from '@/app/_components/Session/SessionWrapper';
import { GoogleMapMarkerType } from '@/app/_lib/types/params';
import { ProductType, RoomType } from '@/app/_lib/types/product';
import { ReviewType } from '@/app/_lib/types/review';
import { priceFormat } from '@/app/_lib/utils/format';

interface DetailInformProps {
  data: ProductType;
  marker: GoogleMapMarkerType;
}

const IconStyle = `absolute right-0 top-[2rem] flex items-center`;

const NEXTURL = process.env.NEXTAUTH_URL;

const DetailInform = async ({ data, marker }: DetailInformProps) => {
  const {
    product_content,
    product_img,
    product_location,
    product_liked,
    product_name,
    product_price,
    product_num,
    PRODUCT_ROOMS,
  } = data;

  const reviewResponse = await fetch(`${NEXTURL}/api/product/review`, {
    //
    next: { tags: [`review`] },
    method: 'POST',
    headers: {},
    body: JSON.stringify({
      product_num,
    }),
  });
  const reviewData: ReviewType[] = await reviewResponse.json();

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <div className="flex h-[60rem] w-[64%] gap-[1%]">
          <div className="relative h-full w-[50%]">
            <Image src={product_img} fill alt={`${product_num}`} className="rounded-xl" />
          </div>
          <ul className="flex w-[50%] flex-1 flex-wrap items-center justify-center gap-[2%] bg-slate-200">
            {PRODUCT_ROOMS?.map((room: RoomType) => (
              <li className="relative h-[49%] w-[49%]" key={room.room_name}>
                <Image
                  src={room.room_image}
                  fill
                  alt={`${room.room_image}`}
                  key={room.room_image}
                  className="rounded-xl"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="relative my-[1rem] flex w-[64%] flex-col gap-[1rem]">
          <SessionWrapper>
            <span className="text-[3.5rem] font-semibold">{product_name}</span>
            <div className="flex justify-between">
              <p>{product_content}</p>
              <span>{priceFormat(product_price)}원</span>
            </div>
            <CustomIcon style={IconStyle} product_num={product_num} likeCount={product_liked}>
              <span>{product_liked}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-12 text-myred-300"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </CustomIcon>
            <span className="my-[1rem] inline-block text-[2.5rem] font-bold">위치정보</span>
            <DetailLocation marker={marker} location={product_location} />
            <div className="flex gap-[1rem]">
              <PreviewReview reviewData={reviewData} product_num={product_num} />
              <Amenities product_num={product_num} />
            </div>
          </SessionWrapper>
        </div>
      </div>
    </div>
  );
};
export default DetailInform;
