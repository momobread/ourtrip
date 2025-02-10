import Image from 'next/image';

const ProductCard = ({ data }: { data: any }) => {
  // console.log(data);
  const { product_content, product_liked, product_name, product_price, product_img } = data;
  // console.log(product_category);
  return (
    <div className="flex h-[45rem] w-[30rem] flex-col items-center justify-center border border-primary-200">
      <div className="relative h-[35rem] w-[30rem]">
        <Image src={product_img} alt="hotelimage" fill />
      </div>
      <span>{product_name}</span>
      <p>{product_content}</p>
      <span>{product_price}</span>
      <span>{product_liked}</span>
    </div>
  );
};
export default ProductCard;
