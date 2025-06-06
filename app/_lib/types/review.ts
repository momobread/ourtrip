interface ReviewType {
  id: number;
  created_at: Date;
  product_num: string;
  review_title: string;
  review_content: string;
  review_rate: number;
  review_img: string;
  review_user: string;
  USER?: { user_name: string };
}

interface ReviewWriteType {
  title: string;
  content: string;
  user: string;
  image: FileList;
}

export type { ReviewType, ReviewWriteType };
