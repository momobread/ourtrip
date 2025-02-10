'use client';
const ProductOptions = () => {
  //쿼리스트링으로 값 올리고
  return (
    <div className="flex gap-5">
      <button className="text-[2rem] font-extrabold">5개씩 보기</button>
      <button className="text-[2rem] font-extrabold">10개씩 보기</button>
      <button className="text-[2rem] font-extrabold">전체보기</button>
    </div>
  );
};
export default ProductOptions;
