import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/adminSlice";

export const Product = () => {
  const productData = useSelector((state) => state.admin.product);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <Stack direction={"column"} p="20px" minW={"80%"}>
      <TableContainer>
        <Table size="sm" color={"white"}>
          <Thead>
            <Tr bgColor={"white"}>
              <Th>Sr.No</Th>
              <Th>Product</Th>
              <Th>Description</Th>
              <Th>Cost</Th>
              <Th>Category</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productData &&
              productData.map((e, i) => (
                <Tr key={e._id || i}>
                  <Td>{i + 1}</Td>
                  <Td>{e.title}</Td>
                  <Td maxW="250px" whiteSpace="normal">{e.description}</Td>
                  <Td>{e.cost}</Td>
                  <Td>{e.category === "other" ? "N/A" : e.category}</Td>
                  <Td>
                    <Button
                      bgColor="rgb(0,18,51)"
                      color="rgb(255,225,189)"
                      onClick={() => {
                        dispatch(deleteProduct(e._id, toast));
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
