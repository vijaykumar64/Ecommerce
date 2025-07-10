import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8001';

const initialState = { data: [] };

const orderSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getOrders(state, action) {
      return { ...state, data: action.payload };
    }
  }
});

export const { getOrders } = orderSlice.actions;

export default orderSlice.reducer;

// Get My Orders
export const getMyOrders = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("TOKEN");

    try {
      const resp = await fetch(`${BASE_URL}/order`, {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
        }
      });

      const data = await resp.json();
      console.log(data);
      dispatch(getOrders(data));
    } catch (err) {
      console.error("Failed to fetch orders:", err.message);
    }
  };
};

// Cancel Request
export function CancelOrder(data, toast) {
  return async function (dispatch, getState) {
    const userId = localStorage.getItem("TOKEN");

    try {
      const sendData = await fetch(`${BASE_URL}/product/refund`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
        body: JSON.stringify(data),
      });

      await sendData.json();

      toast({
        title: 'Cancel Requested',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log("err", err);
    }
  };
}
