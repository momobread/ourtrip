'use client';

import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { GoogleMapMarkerType } from '@/app/_lib/types/params';
import { GoogleMap, Marker, LoadScriptNext } from '@react-google-maps/api';
// InfoWindow, Circle,

const GOOGLE_MAPS_APIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY ?? '';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// 지도보기를 누르면 구글맵이 나타난다. => 숙박의 위치를 센터로 한다
//내위치 버튼을 누르면 내위치로 포커싱한다.그리고 반경을 표시한다.
//

interface DetailLocationProps {
  marker: GoogleMapMarkerType;
  location: string;
}
type currentPositionType = { lng: number; lat: number };
const DetailLocation = ({ marker, location }: DetailLocationProps) => {
  const [currentPosition, setCurrentPosition] = useState<currentPositionType>({
    lng: marker?.lng,
    lat: marker?.lat,
  });
  const [selectMarker, setSelectMarker] = useState<GoogleMapMarkerType[]>([
    {
      title: marker?.title,
      lat: marker?.lat,
      lng: marker?.lng,
      id: marker?.id,
      product_num: marker?.product_num,
      price: marker?.price,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('버튼을 누르면 현재위치로 포커싱됩니다');

  const ClickCurretLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setIsDisabled(true);
      setTooltipMessage('이미 현재위치 입니다');
      navigator.geolocation.getCurrentPosition((position) => {
        setSelectMarker((premarker) => [
          ...premarker,
          {
            id: selectMarker.length,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            title: 'current position',
            price: 0,
          },
        ]);
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log('이 브라우저에서는 현재위치가 지원되지 않습니다');
    }
  };
  // // 지도 로딩 완료 시 로딩 상태 false

  //구글 맵의 타일이 모두 로드되었을 때 호출
  const handleTilesLoaded = () => {
    setIsLoading(false); // 타일 로딩 완료되면 로딩 종료
  };
  console.log(selectMarker);
  return (
    <div className="flex flex-col gap-[1rem] rounded-xl border border-slate-400 p-[2rem]">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <p className="font-medium">{location}</p>
      </div>

      <div className="h-[30rem] sm:h-[50rem]">
        <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_APIKEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            // onLoad={handleMapLoad}
            // onUnmount={handleMapUnmount}
            onTilesLoaded={handleTilesLoaded}
            zoom={15}
          >
            {selectMarker.map((marker, i) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                title={marker.title}
                // onClick={() => setSelectMarker((marker) => [...marker])}
                icon={
                  i + 1 === selectMarker.length
                    ? `http://maps.google.com/mapfiles/ms/icons/green-dot.png`
                    : `http://maps.google.com/mapfiles/ms/icons/red-dot.png`
                }
              />
            ))}
            {isLoading ? (
              <div className="absolute left-[37%] top-[35%]">
                <ClipLoader size={150} />
              </div>
            ) : (
              ''
            )}

            <div onClick={() => ClickCurretLocation()} className="group">
              <p className="absolute bottom-[10%] left-[5%] rounded-md bg-black px-[1rem] py-[0.5rem] font-bold text-purple-50 opacity-0 group-hover:opacity-60">
                {tooltipMessage}
              </p>
              <button
                disabled={isDisabled}
                className="absolute bottom-0 flex size-[4rem] cursor-pointer items-center justify-center bg-slate-50 opacity-70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-12"
                >
                  <path
                    fillRule="evenodd"
                    d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </GoogleMap>
        </LoadScriptNext>
        {isLoading && <p>로딩로딩</p>}
      </div>
    </div>
  );
};
export default DetailLocation;
