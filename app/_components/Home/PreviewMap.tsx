'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import CustomMap from '@/app/_components/CustomMap';
import { GoogleMapMarkerType } from '@/app/_lib/types/params';

const formStyle = `
    sm:w-[55rem] sm:h-[45rem] w-[80vw] h-[30rem] border border-primary-800 rounded-2xl
`;

interface PreviewMapProps {
  markers: GoogleMapMarkerType[];
}

const PreviewMap = ({ markers }: PreviewMapProps) => {
  const [location, setLocation] = useState({ lat: 37.5655, lng: 126.978 });
  const router = useRouter();
  const serachParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { lng, lat, title } = JSON.parse(e.target.value);
    console.log(title, '지역');
    setLocation({ lng, lat });
    const params = new URLSearchParams(serachParams);
    params.set('location', title);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-[3rem] flex w-full flex-col items-center gap-[2rem] sm:h-[55rem]">
      <div className="">
        <select
          onChange={(e) => handleChange(e)}
          className="flex w-[100%] rounded-lg border border-primary-400 py-[1rem] text-center text-[2rem] font-semibold sm:mr-[1rem] sm:inline-block sm:w-[15rem]"
        >
          <option value={JSON.stringify({ lat: 37.5655, lng: 126.978, title: '서울' })}>
            서울
          </option>
          <option value={JSON.stringify({ lat: 37.2636, lng: 127.0286, title: '수원' })}>
            수원
          </option>
          <option value={JSON.stringify({ lat: 37.4563, lng: 126.7052, title: '인천' })}>
            인천
          </option>
          <option value={JSON.stringify({ lat: 35.1796, lng: 129.0756, title: '부산' })}>
            부산
          </option>
          <option value={JSON.stringify({ lat: 35.8714, lng: 128.6014, title: '대구' })}>
            대구
          </option>
        </select>
        <span className="text-[2rem]">을 기준으로 모텔을 안내하고 있어요</span>
      </div>
      <div>
        <span className="font-bold text-primary-200">마커</span>를 클릭하면 해당 숙소 정보로
        이동합니다
      </div>
      <CustomMap category="motel" markers={markers} center={location} formStyle={formStyle} />
      <div className="h-[4rem] text-[2.5rem] font-semibold">좀 더 다양한 숙소가 보고싶다면?</div>
    </div>
  );
};
export default PreviewMap;
