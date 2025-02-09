import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import ContentWrapper from "../components/ContentWrapper";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleFavourite = (productId) => {
    console.log("Favourite button clicked for product ID:", productId);
    // Add your favourite logic here, e.g., update the store or call an API
    // Avoid page redirection or reload
  };

  return (
    <div className="bg-[#0E1527] min-h-screen">
      <div className="flex flex-col md:flex-row container mx-auto p-4">
        {/* Sidebar */}
        <div className="p-4 border border-[#444444] h-full md:mr-8 overflow-y-auto w-full md:w-1/4 lg:w-1/5 text-[#FFFFFF]">
          <h2 className="text-center py-2 bg-[#2765EC] text-[#FFFFFF] hover:shadow-md hover:bg-[#1b56d5] mb-4 rounded-sm">
            Filter by Categories
          </h2>
          <div className="p-2 w-full">
            {categories?.map((c) => (
              <div key={c._id} className="mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={c._id}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor={c._id}
                    className="text-sm font-medium text-white"
                  >
                    {c.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-[#2765EC] text-[#FFFFFF] hover:shadow-md hover:bg-[#1b56d5] mb-4 rounded-sm">
            Filter by Brands
          </h2>
          <div className="p-2 w-full">
            {uniqueBrands?.map((brand, i) => (
              <div key={i} className="mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor={brand}
                    className="text-sm font-medium text-white"
                  >
                    {brand}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-center py-2 bg-[#2765EC] text-[#FFFFFF] hover:shadow-md hover:bg-[#1b56d5] mb-4 rounded-sm">
            Filter by Price
          </h2>
          <div className="w-full my-2">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 bg-transparent border border-[#959fb3] focus:border-[#1b56d5] outline-none text-white placeholder-white"
            />
          </div>

          <div className="w-full">
            <button
              className="w-full py-2 text-center bg-[#2765EC] text-[#FFFFFF] hover:shadow-md hover:bg-[#1b56d5] rounded-sm"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>

      {/* Product Content */}
      <div className="w-full flex-1 bg-[#0E1527] rounded-lg shadow-lg p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
    {products.length === 0 ? (
      <Loader />
    ) : (
      products?.map((p) => (
        <div key={p._id} className="w-full">
          <ProductCard p={p} onFavourite={() => handleFavourite(p._id)} />
        </div>
      ))
    )}
  </div>
</div>


      </div>
    </div>
  );
};

export default Shop;
