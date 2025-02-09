import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import Footer from "./Footer.jsx";
import ContentWrapper from "../components/ContentWrapper";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <Loader />
        </div>
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <div>
          <ContentWrapper>
            <div className="min-h-screen bg-gray-50 text-black mb-8">
              {/* Hero Section */}
              <div className="relative bg-[#F5F5F5] px-6 py-10 lg:px-10 lg:py-20">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-[#FF4800] text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                      Discover Prime Next's Special Picks
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      Explore the best of fashion and style. At Prime Next, we bring you curated collections designed to inspire and elevate your everyday wardrobe. Shop with ease and elegance!
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/shop"
                        className="px-6 py-3 bg-[#FF4800] text-white text-lg font-medium rounded-md shadow-md hover:bg-[#e54300] transition duration-300"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* Products Section */}
              <div className="mt-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
                  Our Top Picks for You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto px-4 lg:px-0">
                  {data?.products?.map((product) => (
                    <div
                      key={product._id}
                      className="shadow-md rounded-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ContentWrapper>

          {/* Footer Section */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
