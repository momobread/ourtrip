import axios from 'axios';

import MainNav from '@/app/_components/layout/MainNav';
import ReviewForm from '@/app/_components/Review/ReviewForm';
import SessionWrapper from '@/app/_components/Session/SessionWrapper';

const NEXTURL = process.env.NEXTAUTH_URL;
async function ReviewPage({ params }: { params: Promise<Record<string, string>> }) {
  const review_num = (await params)?.reviewNum;
  const response = await axios.post(`${NEXTURL}/api/review/get`, {
    review_num,
  });
  const review = response?.data;

  return (
    <section className="min-h-screen">
      <MainNav />
      <div className="mb-[5rem] flex flex-col items-center gap-[2rem]">
        <SessionWrapper>
          <ReviewForm review={review} />
        </SessionWrapper>
      </div>
    </section>
  );
}

export default ReviewPage;
