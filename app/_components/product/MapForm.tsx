'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import CustomMap from '@/app/_components/CustomMap';
import { GoogleMapMarkerType } from '@/app/_lib/types/params';

interface MapFormProps {
  formStyle: string;
  markers: GoogleMapMarkerType[];
}
const MapForm = ({ formStyle, markers }: MapFormProps) => {
  const [location, setLocation] = useState({ lat: 37.5655, lng: 126.978 });
  const [currentFilter, setCurrentFilter] = useState<string>('서울');
  const router = useRouter();
  const serachParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { lng, lat, title } = JSON.parse(e.target.value);
    setLocation({ lng, lat });
    setCurrentFilter(title);
    const params = new URLSearchParams(serachParams);
    params.set('location', title);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex h-[50rem] w-full flex-col justify-center gap-[1rem] sm:h-[50rem] sm:flex-row sm:gap-0">
      <div className="flex w-full flex-col items-center justify-center sm:w-[30%] sm:border-y sm:border-l sm:border-gray-400">
        <div className="flex w-[90%] flex-col gap-[1rem] rounded-lg bg-slate-200 pb-[1rem]">
          <span className="p-[1rem] text-[2.5rem]">
            {currentFilter}을 기준으로 숙소를 안내하고 있어요
          </span>
          <div>
            <span className="p-[1rem]">위치를 선택하여 주세요</span>
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
      <CustomMap category="motel" formStyle={formStyle} markers={markers} center={location} />
    </div>
  );
};
export default MapForm;
