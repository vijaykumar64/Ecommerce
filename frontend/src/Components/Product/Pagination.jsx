import { Button, Center, Container, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";

export const Pagination = ({ category = [], filter = 1 }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const totalCount = useSelector((state) => state.product.totalCount);
  const totalPages = Math.ceil(totalCount / 12);

  useEffect(() => {
    dispatch(fetchProducts(page, category, filter));
  }, [page, category, filter]);

  useEffect(() => {
    setPage(1); // reset page when filters change
  }, [category, filter]);

  return (
    <Container padding="20px" minW="100%">
      <Center>
        <HStack gap="20px">
          <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
            Prev
          </Button>
          <Button>{page}</Button>
          <Button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </HStack>
      </Center>
    </Container>
  );
};
