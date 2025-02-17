'use client';

import { useEffect, useState } from 'react';
import CustomForm from '../CustomForm';
import CustomMap from '../CustomMap';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const MapForm = ({ formStyle, markers }) => {
  const [location, setLocation] = useState({ lat: 37.5655, lng: 126.978 });
  const router = useRouter();
  const serachParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (e) => {
    const { lng, lat, title } = JSON.parse(e.target.value);
    setLocation({ lng, lat });
    const params = new URLSearchParams(serachParams);
    params.set('location', title);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex h-[50rem] w-full justify-center">
      <div className="flex w-[30%] flex-col items-center justify-center border border-primary-300">
        <div className="flex w-[90%] flex-col gap-[1rem] bg-slate-200">
          <span className="text-[2.5rem]">서울을 기준으로 숙소를 안내하고 있어요</span>
          <div>
            <span>위치를 선택하여 주세요</span>
            <select onChange={(e) => handleChange(e)}>
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
          </div>
        </div>
      </div>
      <CustomMap formStyle={formStyle} markers={markers} center={location} />
    </div>
  );
};
export default MapForm;
