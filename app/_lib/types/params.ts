import { ProductType } from '@/app/_lib/types/product';

interface FetchProductsType {
  filter: string;
  category: string;
  itemPerPage: string;
  currentPage: string;
  location: string;
}
interface FetchProductsReturnType {
  productData: ProductType[];
  totalItems: number;
  totalPages: number;
}

interface GoogleMapMarkerType {
  id: number;
  lat: number;
  lng: number;
  title?: string;
  product_num?: string;
}

export type { FetchProductsType, FetchProductsReturnType, GoogleMapMarkerType };
