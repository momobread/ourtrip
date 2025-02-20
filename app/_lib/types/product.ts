interface ProductType {
  id: number;
  product_name: string;
  product_content: string;
  product_price: number;
  product_img: string;
  product_category: number;
  product_liked: number;
  product_created_at: Date;
  product_num: string;
  product_lng: number;
  product_lat: number;
  PRODUCT_ROOMS: RoomType[];
}

interface RoomType {
  id: number;
  room_image: string;
  room_price: number;
  room_name: string;
  product_num: string;
}
interface PreImgProductType {
  title: string;
  url: string;
}

export type { ProductType, PreImgProductType, RoomType };
