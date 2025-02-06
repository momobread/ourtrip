import Image from 'next/image';
import Carousel from './_components/Home/Carousel';
import { fetchCarousel, fetchPopularCard } from './_lib/home';
import PopularLocation from './_components/Home/PopularList';
import PopularCard from './_components/Home/PopularCard';
import EventPrivew from './_components/Home/EventPreview';

export default async function Home() {
  const carouselImg = await fetchCarousel();
  const popularData = await fetchPopularCard();

  const po_location = popularData?.popular_location?.location;
  const best_hotel = popularData?.popular_accommodation?.best;
  const hot_hotel = popularData?.hot_hotel.hot;
  const po_activity = popularData?.popular_activity.activity;

  console.log(best_hotel);
  // const popularLocation = await

  return (
    <section className="h-full">
      <Carousel Image={carouselImg} />
      <PopularLocation
        title="인기 숙소 추천"
        render={best_hotel?.map((popular) => (
          <PopularCard size="medium" img={popular.url} title={popular.title} />
        ))}
      />
      <PopularLocation
        title="hot한 호텔"
        render={hot_hotel?.map((popular) => (
          <PopularCard size="medium" img={popular.url} title={popular.title} />
        ))}
      />
      <PopularLocation
        title="인기있는 지역"
        render={po_location?.map((popular) => (
          <PopularCard img={popular.url} title={popular.title} />
        ))}
      />
      <PopularLocation
        title="많이찾는 액티비티"
        render={po_activity?.map((popular) => (
          <PopularCard img={popular.url} title={popular.title} />
        ))}
      />
      <EventPrivew />
    </section>
  );
}
