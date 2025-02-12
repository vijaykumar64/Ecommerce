import { useGetTopProductsQuery } from "../redux/api/productApiSlice";

import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProduct from "../pages/Products/SmallProduct";
import BannerSlider from "./BannerSlider";
import Loader from "./Loader";
import Hero from "./Hero";
import ContentWrapper from "./ContentWrapper";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  //   console.log(data);

  // if (isLoading) {
  //   return <Loader />;
  // }
  if (error) {
    return <h1>ERROR</h1>;
  }
  return (
    <>
      <div className="bg-[#0e1629]">
        <Hero />
        <ContentWrapper>
          <div className="container justify-around items-start flex flex-wrap mx-auto gap-4">
            <div className="mb-[2rem] lg:mb-0">
              <h4 className="text-base lg:text-2xl font-bold mb-8">
                Top Products
              </h4>
              <div className="grid grid-cols-2 gap-4 items-center w-full">
                {data?.map((product) => (
                  <div key={product._id}>
                    <SmallProduct product={product} />
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <ProductCarousel />
            </div>
          </div>
        </ContentWrapper>
      </div>
      <div style={{ overflow: "hidden" }}>
       
      </div>
    </>
  );
};
export default Header;
