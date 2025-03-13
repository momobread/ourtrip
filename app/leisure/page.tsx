export const dynamic = 'force-dynamic';

import Carousel from '@/app/_components/Home/Carousel';
import MainNav from '@/app/_components/layout/MainNav';
import LeisureList from '@/app/_components/Leisure/LeisureList';

const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

const LeisurePage = async () => {
  const CarouselResponse = await fetch(`${NEXTAUTH_URL}/api/leisure/carousel`, { method: 'GET' });
  const leisure_carousel = await CarouselResponse.json();
  const LeisureResponse = await fetch(`${NEXTAUTH_URL}/api/leisure`, { method: 'GET' });
  const leisure_data = await LeisureResponse.json();

  const leisureData1 = leisure_data.slice(0, 3);
  const leisureData2 = leisure_data.slice(3, 6);
  const leisureData3 = leisure_data.slice(6, 9);

  return (
    <>
      <MainNav />
      <main className="h-full w-full">
        <section className="flex h-full flex-col items-center">
          <div className="mb-[2rem] text-[3rem] font-bold">오늘의 추천 레져활동!</div>
          <Carousel data={leisure_carousel} tag="leisure" />
          <LeisureList datas={leisureData3} category="leisure" title="잔잔한 레져" />
          <LeisureList datas={leisureData2} category="leisure" title="스릴넘치는 레져" />
          <LeisureList datas={leisureData1} category="leisure" title="액티비티한 레져" />
        </section>
      </main>
    </>
  );
};
export default LeisurePage;
