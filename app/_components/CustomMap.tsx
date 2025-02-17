'use client';

import { useEffect, useState } from 'react';

import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';

const GOOGLE_MAPS_APIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY ?? '';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.5665,
  lng: 126.978,
};

// 지도보기를 누르면 구글맵이 나타난다. => 숙박의 위치를 센터로 한다
//내위치 버튼을 누르면 내위치로 포커싱한다.그리고 반경을 표시한다.
//

interface CustomMapStyle {
  formStyle: any;
  markers: any;
  center: { lat: string; lng: string };
}

const CustomMap = ({ formStyle, markers, center }: CustomMapStyle) => {
  const [selectMarker, setSelectMarker] = useState<any>(null);
  const [currentPosition, setCurrentPosition] = useState<any>(center);
  const [focus, setFocus] = useState<number>(10);

  useEffect(() => {
    setCurrentPosition(center);
  }, [center]);

  const ClickCurretLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
      setFocus(14);
    } else {
      console.log('이 브라우저에서는 현재위치가 지원되지 않습니다');
    }
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
    <div className={`flex flex-col items-center border border-primary-800 p-[2rem] ${formStyle}`}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_APIKEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={focus}>
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

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.title}
              onClick={() => setSelectMarker(marker)}
            />
          ))}
          {selectMarker && (
            <InfoWindow
              position={{ lat: selectMarker.lat, lng: selectMarker.lng }}
              onCloseClick={() => setSelectMarker(null)}
            >
              <div>
                <p>TEST용 입니다</p>
                <p>{selectMarker.title}</p>
              </div>
            </InfoWindow>
          )}
          <div
            onClick={() => ClickCurretLocation()}
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
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default CustomMap;
