import Carousel from '@/app/_components/Home/Carousel';
import EventPrivew from '@/app/_components/Home/EventPreview';
import PopularCard from '@/app/_components/Home/PopularCard';
import PopularLocation from '@/app/_components/Home/PopularList';
import PreviewMap from '@/app/_components/Home/PreviewMap';
import MainNav from '@/app/_components/layout/MainNav';
import { type PreImgProductType } from '@/app/_lib/types/product';
import { fetchCarousel, fetchPopularCard } from '@/app/api/home';
import { fetchPreviewProducts } from '@/app/api/product/product';

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const carouselImg = await fetchCarousel();
  const popularData = await fetchPopularCard();

  const po_location: PreImgProductType[] = popularData?.popular_location?.location;
  const best_hotel: PreImgProductType[] = popularData?.popular_accommodation?.best;
  const hot_hotel: PreImgProductType[] = popularData?.hot_hotel.hot;
  const po_activity: PreImgProductType[] = popularData?.popular_activity.activity;

  const filterLocation = (await searchParams).location ?? '서울';

  const productData = await fetchPreviewProducts(filterLocation);
  const markers = productData.map((data, i) => {
    return {
      id: i,
      lat: data.product_lat,
      lng: data.product_lng,
      title: data.product_name,
      product_num: data.product_num,
    };
  });

  return (
    <>
      <main className="h-full">
        <section className="h-full">
          <PreviewMap markers={markers} />
          <MainNav />
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
