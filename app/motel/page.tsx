import ProductList from '../_components/product/ProductList';
import SideNav from '../_components/product/SideNav';

const page = async ({ searchParams }) => {
  const filter = (await searchParams).filter;

  return (
    <section className="h-full">
      <div className="flex flex-col items-center">
        <SideNav />
        <ProductList filter={filter} />
      </div>
    </section>
  );
};
export default page;
