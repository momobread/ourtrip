import { ProductType } from '@/app/_lib/types/product';

interface FetchProductsType {
  filter: string;
  category: string;
  itemPerPage: string;
  currentPage: string;
}
interface FetchProductsReturnType {
  productData: ProductType[];
  totalItems: number;
  totalPages: number;
}

export type { FetchProductsType, FetchProductsReturnType };
