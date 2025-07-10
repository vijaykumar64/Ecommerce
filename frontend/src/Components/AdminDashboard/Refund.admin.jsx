import React, { useEffect } from "react";
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
import { fetchAllOrders, updateOrderStatus } from "../../redux/adminSlice";

export const Refund = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const orders = useSelector((state) => state.admin.orders);

  // Fetch orders on mount
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <Stack direction={"column"} p="20px" minW={"80%"}>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr bgColor={"white"}>
              <Th>Product</Th>
              <Th>User</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders &&
              orders.map((e, i) => {
                const productTitle = e?.product?.title || "Unknown Product";
                const userName = e?.user?.name || "Unknown User";
                const orderStatus = e?.status || "Pending";
                const orderId = e?._id;

                return (
                  <Tr key={orderId || i}>
                    <Td>{productTitle}</Td>
                    <Td>{userName}</Td>
                    <Td>{orderStatus}</Td>
                    <Td>
                      <Button
                        bgColor="rgb(0,18,51)"
                        color="rgb(255,225,189)"
                        size="sm"
                        disabled={orderStatus === "Cancelled"}
                        onClick={() => {
                          if (orderId) {
                            dispatch(updateOrderStatus(orderId, "Cancelled", toast));
                          }
                        }}
                      >
                        {orderStatus === "Cancelled"
                          ? "Order Cancelled"
                          : "Cancel Order"}
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
