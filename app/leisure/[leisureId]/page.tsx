import axios from 'axios';

import MainNav from '@/app/_components/layout/MainNav';
import DetailInform from '@/app/_components/ProductDetail/DetailInform';
import RoomOptions from '@/app/_components/ProductDetail/RoomOptions';
import LeisureDetail from '@/app/_components/Leisure/LeisureDetail';
import SessionWrapper from '@/app/_components/Session/SessionWrapper';

const NEXTURL = process.env.NEXTAUTH_URL;

interface PageProps {
  params: Promise<Record<string, string | undefined>>;
  searchParams: Promise<Record<string, string>>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const leisureId = (await params)?.leisureId ?? '';

  const leisureDetailData = await axios.post(
    `${NEXTURL}/api/leisure/detail`,
    {
      leisure_num: leisureId,
    },
    {}
  );

  const leisureData = leisureDetailData?.data;

  return (
    <>
      <MainNav />
      <main className="">
        <section className="">
          <SessionWrapper>
            <LeisureDetail data={leisureData} />
          </SessionWrapper>
        </section>
      </main>
    </>
    //
  );
};
export default page;
