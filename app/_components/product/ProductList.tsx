'use client';
import { fetchProducts, makeProductsBeta } from '@/app/_lib/product';
import ProductCard from './ProductCard';
import Loader from '../Loader';
import { useState } from 'react';

const ProductList = ({ productData, pageNum }) => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className="my-[5rem] flex w-full justify-center">
      {/* <button onClick={makeProductsBeta}>만들기</button> */}
      <ul className="flex w-[90%] flex-wrap justify-center gap-[5rem] bg-slate-200 py-[5rem]">
        {productData?.map((product) => <ProductCard key={product.id} data={product} />)}
      </ul>
    </div>
  );
};
export default ProductList;
