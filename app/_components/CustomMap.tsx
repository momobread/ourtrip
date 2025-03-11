'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { GoogleMapMarkerType } from '@/app/_lib/types/params';
import { priceFormat } from '@/app/_lib/utils/format';
import { GoogleMap, Marker, InfoWindow, LoadScriptNext } from '@react-google-maps/api';

const GOOGLE_MAPS_APIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY ?? '';

const containerStyle = {
  width: '100%',
  height: '100%',
};

type CurrentPositionType = { lng: number; lat: number };
interface CustomMapStyle {
  formStyle: string;
  markers: GoogleMapMarkerType[];
  center: { lat: number; lng: number };
  category: string;
}

const CustomMap = ({ formStyle, markers, center, category }: CustomMapStyle) => {
  const [selectMarker, setSelectMarker] = useState<GoogleMapMarkerType | null>(null);
  const [currentPosition, setCurrentPosition] = useState<CurrentPositionType>(center);
  const [focus, setFocus] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [markerList, setMarkList] = useState<GoogleMapMarkerType[]>(markers);

  const [tooltipMessage, setTooltipMessage] =
    useState<string>('버튼을 누르면 현재위치로 포커싱됩니다');

  useEffect(() => {
    setMarkList(markers);
  }, [markers]);

  useEffect(() => {
    setCurrentPosition(center);
  }, [center]);

  const ClickCurretLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setIsDisabled(true);
      setTooltipMessage('이미 현재위치 입니다');
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMarkList((pre) => [
          ...pre,
          {
            id: 99,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            price: 0,
          },
        ]);
      });

      setFocus(14);
    } else {
      console.log('이 브라우저에서는 현재위치가 지원되지 않습니다');
    }
  };

  const handleTilesLoaded = () => {
    setIsLoading(false); // 타일 로딩 완료되면 로딩 종료
  };
  // useEffect(() => {
  //   if (currentPosition === center) return;
  //   setMarkers((markers) => [
  //     ...markers,
  //     {
  //       id: markers.length + 1,
  //       lat: currentPosition.lat,
  //       lng: currentPosition.lng,
  //       title: 'hello',
  //     },
  //   ]);
  // }, [currentPosition]);

  return (
    <div className={`flex flex-col items-center p-[2rem] ${formStyle} `}>
      <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_APIKEY}>
        <GoogleMap
          onTilesLoaded={handleTilesLoaded}
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={focus}
        >
          {/* {markers.map((marker, index) => (
            <Circle
              key={index}
              center={{ lat: marker.lat, lng: marker.lng }}
              radius={2000}
              options={{
                fillColor: '#ff0',
                fillOpacity: 0.3,
                strokeColor: '#ff0000',
                strokeOpacity: 0.3,
                strokeWeight: 2,
              }}
            />
          ))} */}
          {/* <Circle
            key={currentPosition}
            center={{ lat: currentPosition.lat, lng: currentPosition.lng }}
            radius={1.5 * 1000}
            options={{
              fillColor: '#D4BEE4',
              fillOpacity: 0.7,
              strokeColor: '#ff0000',
              strokeOpacity: 0.3,
              strokeWeight: 2,
            }}
          /> */}

          {markerList.map((marker, i) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.title}
              onClick={() => setSelectMarker(marker)}
              icon={
                isDisabled && i + 1 === markerList.length
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
          {selectMarker && (
            <InfoWindow
              position={{ lat: selectMarker.lat, lng: selectMarker.lng }}
              onCloseClick={() => setSelectMarker(null)}
            >
              <div>
                <p className="text-bold">
                  {selectMarker.price ? `${priceFormat(selectMarker.price)}원` : '내위치'}
                </p>
                <p className="font-bold text-primary-200">{selectMarker.title}</p>
                <Link
                  href={`/${category}/${selectMarker.product_num}`}
                  className="font-bold text-red-300"
                >
                  상세정보 보기
                </Link>
              </div>
            </InfoWindow>
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
    </div>
  );
};
export default CustomMap;
