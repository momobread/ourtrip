import ProductCard from '@/app/_components/product/ProductCard';
import { ProductType } from '@/app/_lib/types/product';

interface ProductList {
  productData: ProductType[];
}

const ProductList = ({ productData }: ProductList) => {
  return (
    <div className="mb-[5rem] flex w-full justify-center">
      {/* <button onClick={makeProductsBeta}>만들기</button> */}
      <ul className="flex min-h-[150rem] w-[90%] flex-wrap justify-center gap-[3rem] py-[5rem]">
        {productData?.map((product: ProductType) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
