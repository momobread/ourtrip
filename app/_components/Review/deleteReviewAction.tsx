'use server';

import { revalidateTag } from 'next/cache';

const NEXT_URL = process.env.NEXTAUTH_URL;

export async function deleteReviewAction(id: number) {
  console.log(id, '되는중');
  try {
    await fetch(`${NEXT_URL}/api/review/post`, {
      // next: { tags: [`review_${id}`] },
      method: 'DELETE',
      headers: {},
      body: JSON.stringify({
        id,
      }),
    });
    revalidateTag('review');
    // revalidateTag(`review_${id}`);
    return { status: 'success' };
  } catch (e) {
    const ErrorMessage = e instanceof Error ? e.message : '삭제 실패(Client)';
    return { error: ErrorMessage };
  }
}
