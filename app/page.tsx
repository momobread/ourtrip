import Carousel from '@/app/_components/Home/Carousel';
import EventPrivew from '@/app/_components/Home/EventPreview';
import PopularCard from '@/app/_components/Home/PopularCard';
import PopularLocation from '@/app/_components/Home/PopularList';
import MainNav from '@/app/_components/layout/MainNav';
import { type PreImgProductType } from '@/app/_lib/types/product';
import { fetchCarousel, fetchPopularCard } from '@/app/api/home';

export default async function Home() {
  const carouselImg = await fetchCarousel();
  const popularData = await fetchPopularCard();

  const po_location: PreImgProductType[] = popularData?.popular_location?.location;
  const best_hotel: PreImgProductType[] = popularData?.popular_accommodation?.best;
  const hot_hotel: PreImgProductType[] = popularData?.hot_hotel.hot;
  const po_activity: PreImgProductType[] = popularData?.popular_activity.activity;

  return (
    <>
      <MainNav />
      <main className="h-full">
        <section className="h-full">
          <Carousel Image={carouselImg} />
          <PopularLocation
            title="인기 숙소 추천"
            render={best_hotel?.map((popular, i) => (
              <PopularCard size="medium" img={popular.url} title={popular.title} key={i} />
            ))}
          />
          <PopularLocation
            title="hot한 호텔"
            render={hot_hotel?.map((popular, i) => (
              <PopularCard size="medium" img={popular.url} title={popular.title} key={i} />
            ))}
          />
          <PopularLocation
            title="인기있는 지역"
            render={po_location?.map((popular, i) => (
              <PopularCard img={popular.url} title={popular.title} key={i} />
            ))}
          />
          <PopularLocation
            title="많이찾는 액티비티"
            render={po_activity?.map((popular, i) => (
              <PopularCard img={popular.url} title={popular.title} key={i} />
            ))}
          />
          <EventPrivew />
        </section>
      </main>
    </>
  );
}
