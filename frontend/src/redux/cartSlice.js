import { createSlice } from "@reduxjs/toolkit";

const BASE_URL ='http://localhost:8001';

const initialState = { data: [], address: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.push(-1);
    },
    getCartItem(state, action) {
      return { ...state, data: action.payload };
    },
    saveAddress(state, action) {
      return { ...state, address: action.payload };
    },
  },
});

export const { add, getCartItem, saveAddress } = cartSlice.actions;
export default cartSlice.reducer;

// Add item to cart
export const addItem = (productid, toast, status) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    if (userId && userId.length > 10) {
      const resp = await fetch(`${BASE_URL}/cart`, { // ✅
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
        body: JSON.stringify({ product: productid }),
      });
      const data = await resp.json();
      dispatch(getItem());
      if (resp.status == 200) {
        toast({
          title: "Item Added to Cart",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        status(true);
      } else {
        toast({
          title: "Item already in cart",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Login Required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
};

// Order success
export const Order = (toast) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    if (userId && userId.length > 10) {
      const resp = await fetch(`${BASE_URL}/order`, { // ✅
        method: "POST",
        headers: { authorization: `bearer ${userId}` },
      });
      const data = await resp.json();
      toast({
        title: "Order Placed Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      dispatch(getItem());
    } else {
      alert("Login to add Item To Cart");
    }
  };
};

// Get cart items
export const getItem = () => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    if (userId && userId.length > 10) {
      const resp = await fetch(`${BASE_URL}/cart`, { // ✅
        method: "GET",
        headers: {
          authorization: `bearer ${userId}`,
        },
      });
      const data = await resp.json();
      dispatch(getCartItem(data || []));
      console.log(data);
    } else {
      alert("Login to add Item To Cart");
    }
  };
};

// Increase quantity
export const IncreaseQty = (cartId, qty) => {
  return async (dispatch, getState) => {
    const user = localStorage.getItem("TOKEN");
    const newData = getState();

    const UpdatedData = newData.cart.data.map((e) =>
      e._id == cartId ? { ...e, qty: e.qty + 1 } : e
    );

    dispatch(getCartItem(UpdatedData || []));

    const resp = await fetch(`${BASE_URL}/cart/${cartId}`, { // ✅
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${user}`,
      },
      body: JSON.stringify({ qty }),
    });

    const data = await resp.json();
    console.log(data);
  };
};

// Decrease quantity
export const DecreaseQty = (cartId, qty) => {
  return async (dispatch, getState) => {
    const user = localStorage.getItem("TOKEN");
    const newData = getState();

    const UpdatedData = newData.cart.data.map((e) =>
      e._id == cartId ? { ...e, qty: e.qty - 1 } : e
    );

    dispatch(getCartItem(UpdatedData || []));

    const resp = await fetch(`${BASE_URL}/cart/${cartId}`, { // ✅
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${user}`,
      },
      body: JSON.stringify({ qty }),
    });

    const data = await resp.json();
    console.log(data);
  };
};

// Add Address
export const AddAddress = (data, toast) => {
  return async (dispatch, getState) => {
    const user = localStorage.getItem("TOKEN");
    const resp = await fetch(`${BASE_URL}/address`, { // ✅
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${user}`,
      },
      body: JSON.stringify(data),
    });

    const NewData = await resp.json();
    toast({
      title: "Address Added Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    console.log(NewData);
  };
};

// Get Address
export const GetAddress = () => {
  return async (disptach, getState) => {
    const user = localStorage.getItem("TOKEN");
    const resp = await fetch(`${BASE_URL}/address`, { // ✅
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${user}`,
      },
    });

    const parsedData = await resp.json();
    console.log(parsedData);

    if (parsedData && parsedData.fullname && parsedData.fullname.length > 0) {
      disptach(saveAddress(parsedData));
    }
  };
};

// Update Address
export const UpdateAddress = (data, toast) => {
  return async (dispatch, getState) => {
    const user = localStorage.getItem("TOKEN");
    const resp = await fetch(`${BASE_URL}/address`, { // ✅
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${user}`,
      },
      body: JSON.stringify(data),
    });

    toast({
      title: "Address Updated",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    const NewData = await resp.json();
    dispatch(GetAddress());
  };
};

// Remove cart item
export const RemoveCartItem = (id, toast) => {
  return async (dispatch, getState) => {
    const user = localStorage.getItem("TOKEN");
    const resp = await fetch(`${BASE_URL}/cart/${id}`, { // ✅
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${user}`,
      },
    });

    toast({
      title: "Item Removed",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    dispatch(getItem());
  };
};
