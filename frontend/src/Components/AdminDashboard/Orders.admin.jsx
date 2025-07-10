import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, updateOrderStatus } from "../../redux/adminSlice";

export const Orders = () => {
  const OrderData = useSelector((state) => state.admin.order);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <Stack direction={"column"} p="20px" minW={"80%"}>
      <TableContainer>
        <Table size="sm" color={"white"}>
          <TableCaption placement="top" color="white">
            Orders Management
          </TableCaption>
          <Thead>
            <Tr bgColor={"white"}>
              <Th>Sr.No</Th>
              <Th>Product</Th>
              <Th>User</Th>
              <Th>Status</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>

          <Tbody>
            {OrderData &&
              OrderData.map((e, i) => (
                <Tr key={e._id || i}>
                  <Td>{i + 1}</Td>
                  <Td>{e.product && e.product.title ? e.product.title : "N/A"}</Td>

                  <Td>{e.user && e.user.name ? e.user.name : "N/A"}</Td>
                  <Td>
                    <Select
                      bgColor={"rgb(22,17,58)"}
                      color="white"
                      value={e.status}
                      onChange={(eve) =>
                        dispatch(updateOrderStatus(e._id, eve.target.value, toast))
                      }
                    >
                      <option style={{ backgroundColor: "rgb(22,17,58)" }} value="Placed">
                        Placed
                      </option>
                      <option style={{ backgroundColor: "rgb(22,17,58)" }} value="Dispatched">
                        Dispatched
                      </option>
                      <option style={{ backgroundColor: "rgb(22,17,58)" }} value="Out for delivery">
                        Out for Delivery
                      </option>
                      <option style={{ backgroundColor: "rgb(22,17,58)" }} value="Cancelled">
                        Cancelled
                      </option>
                    </Select>
                  </Td>
                  <Td>
                    <Button
                      bgColor="rgb(0,18,51)"
                      color="rgb(255,225,189)"
                      onClick={() => dispatch(deleteOrder(e._id, toast))}
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
