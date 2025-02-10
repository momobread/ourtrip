//데이터 갯수가 많아질수록 서버 부하가 생길 수 있어서 요청에다가 갯수를 넣어 받는 방법을 쓰자

// const pageNation = ({ option, productData }: { option: number; productData: any }) => {
//   const pageNum = Math.ceil(productData.length / option); //36개 7.x => 8페이지
//   const slideData = Array.from({ length: pageNum }, (v, i) => {
//     return productData.slice(i * option, option * (i + 1));
//   });

//   return { slideData, pageNum };
// };
// export { pageNation };
