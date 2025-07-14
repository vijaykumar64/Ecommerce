import {
  Checkbox,
  Heading,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../Components/Product/ProductItem";
import { fetchProducts, fetchCategories } from "../redux/productSlice";

const Shop = () => {
  const products = useSelector((state) => state.product.data);
  const categories = useSelector((state) => state.product.categories);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [filter, setFilter] = useState(1);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchProducts(undefined, categoriesSelected, filter)); 
  }, [categoriesSelected, filter]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      minW="100%"
      p="40px"
      gap="40px"
      alignItems="flex-start"
    >
     
      <Stack
        direction={"column"}
        gap="20px"
        minW={{ base: "100%", md: "240px" }}
        maxW="300px"
      >
        <Heading
          pb="5px"
          fontSize="20px"
          color="rgb(0,18,51)"
          borderBottom={"2px"}
          borderBottomColor="rgb(0,18,51)"
        >
          CATEGORY
        </Heading>

        <Stack mt="20px" direction="column" gap="10px">
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <Checkbox
                key={cat}
                value={cat}
                isChecked={categoriesSelected.includes(cat)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (e.target.checked) {
                    setCategoriesSelected((prev) => [...prev, value]);
                  } else {
                    setCategoriesSelected((prev) =>
                      prev.filter((c) => c !== value)
                    );
                  }
                }}
                colorScheme={"blue"}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Checkbox>
            ))}
        </Stack>

        <Heading
          pb="5px"
          color="rgb(0,18,51)"
          borderBottom={"2px"}
          borderBottomColor="rgb(0,18,51)"
          fontSize="20px"
        >
          FILTER BY PRICE
        </Heading>
        <Stack mt="20px" direction="column" gap="10px">
          <Checkbox
            isChecked={filter === 1}
            onChange={() => setFilter(1)}
            colorScheme={"blue"}
          >
            Low to High
          </Checkbox>
          <Checkbox
            isChecked={filter === -1}
            onChange={() => setFilter(-1)}
            colorScheme={"blue"}
          >
            High to Low
          </Checkbox>
        </Stack>
      </Stack>

    
      <Stack direction="column" flex={1}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="20px">
          {products.map((e) => (
            <ProductItem
              key={e._id}
              img={e.image}
              title={e.title}
              cost={e.cost}
              category={e.category}
              id={e._id}
              description={e.description}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default Shop;
