'use client';

import { useEffect, useState } from 'react';

type carousel = {
  title: string;
  url: string;
};

interface CarouselType {
  Image: carousel[];
  style?: string;
}

const buttonStyle = `
  absolute top-[50%] bg-[rgba(225,225,225,0.7)] rounded-3xl w-12 h-12 text-[#000] font-semibold z-10
`;

const Carousel = ({ Image, style }: CarouselType) => {
  const slides = Image;
  const [currentIndex, setCurrenIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrenIndex((v) => (v === Image.length - 1 ? 0 : v + 1));
  };
  const handlePrevious = () => {
    setCurrenIndex((v) => (v === 0 ? 3 : v - 1));
  };
  return (
    <div
      className={`${style ? style : 'h-[30rem] w-full xl:h-[80rem]'} relative max-w-[100%] overflow-hidden`}
    >
      <div className="absolute flex">
        {slides.map((carousel) => (
          <div
            className="carousel-slide left-0 top-0 flex w-full flex-shrink-0 items-center justify-center"
            key={carousel?.title}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <img src={carousel?.url} alt="carousel" className="h-[30rem] w-full xl:h-[80rem]" />
          </div>
        ))}

        {style ? (
          ' '
        ) : (
          <>
            <button className={`${buttonStyle} left-10`} onClick={handlePrevious}>
              -
            </button>
            <button className={`${buttonStyle} right-10`} onClick={handleNext}>
              +
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Carousel;
