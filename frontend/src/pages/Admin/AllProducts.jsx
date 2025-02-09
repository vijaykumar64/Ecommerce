import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../../redux/api/productApiSlice";
import { setProducts } from "../../redux/features/shop/shopSlice";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.shop);

  const { data, isLoading, isError } = useGetFilteredProductsQuery({
    checked: [],
    radio: [],
  });

  // Dispatch products to Redux store
  useEffect(() => {
    if (!isLoading && !isError && data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch, isLoading, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200">
      <div className="p-6 max-w-5xl">
        <div className="text-center text-xl md:text-2xl font-bold mb-6 text-gray-800">
          All Products ({products?.length || 0})
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products?.length === 0 ? (
            <div>No products available</div>
          ) : (
            products?.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={p.image} // Replace image with the actual key for the product image
                  alt={p.name}
                  className="w-full h-60 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {p.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    ₹{p.price}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {p.description || "No description available"}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/admin/product/update/${p._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded border-none hover:bg-blue-700"
                    >
                      Delete Product
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                    <p className="text-sm font-medium text-gray-700">
                      ₹{p.price}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;