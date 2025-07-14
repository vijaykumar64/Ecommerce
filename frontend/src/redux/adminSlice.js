import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./userSlice";

const BASE_URL = 'http://localhost:8001';

const initialState = {
  cart: [],
  user: [],
  order: [],
  product: [],
  refund: [],
  recentuser: [],
  categoryList: [], 
  orders: [], 
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminData(state, action) {
      return {
        ...state,
        refund: action.payload.allrefund || [],
        product: action.payload.allproduct,
        cart: action.payload.allcart,
        user: action.payload.alluser,
        order: action.payload.allorder,
      };
    },
    setCategoryList(state, action) {
      state.categoryList = action.payload || []; 
    },
    setOrders(state, action) { 
      state.orders = action.payload || [];
    },
  },
});

export const { setAdminData, setCategoryList, setOrders } = adminSlice.actions;
export default adminSlice.reducer;


export const getAdminData = () => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    try {
      const resp = await fetch(`${BASE_URL}/admin/admindata`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
      });
      const data = await resp.json();
      dispatch(setAdminData(data));
      console.log(data);
      if (resp.status !== 200) {
        dispatch(logout());
      }
    } catch (err) {
      alert(err.message);
    }
  };
};


export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${BASE_URL}/product/categories`);
      const data = await res.json();
      dispatch(setCategoryList(data));
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };
};


export const fetchAllOrders = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("TOKEN");
    try {
      const res = await fetch(`${BASE_URL}/admin/orders`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      dispatch(setOrders(data));
    } catch (err) {
      console.error("Fetch Orders Error:", err.message);
    }
  };
};


export const roleSwitch = (id, toast) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    try {
      await fetch(`${BASE_URL}/admin/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
      });
      toast({
        title: 'Role Updated',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      dispatch(getAdminData());
    } catch (err) {
      console.log(err.message);
      toast({
        title: "Role Couldn't be Updated",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
};


export const deleteCartItem = (id, toast) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    try {
      await fetch(`${BASE_URL}/admin/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
      });
      toast({
        title: 'Item Deleted',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      dispatch(getAdminData());
    } catch (err) {
      console.log(err.message);
    }
  };
};


export const deleteUser = (id, toast) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    try {
      await fetch(`${BASE_URL}/admin/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
      });
      toast({
        title: 'User Deleted',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      dispatch(getAdminData());
    } catch (err) {
      console.log(err.message);
    }
  };
};


export const deleteProduct = (id, toast) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    try {
      await fetch(`${BASE_URL}/admin/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
      });
      toast({
        title: 'Product Deleted Successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      dispatch(getAdminData());
    } catch (err) {
      console.log(err.message);
    }
  };
};


export const deleteOrder = (id, toast) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    try {
      await fetch(`${BASE_URL}/admin/order/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
      });
      toast({
        title: 'Order Deleted Successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      dispatch(getAdminData());
    } catch (err) {
      console.log(err.message);
    }
  };
};


export const updateOrderStatus = (id, data, toast) => {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem("TOKEN");
    try {
      await fetch(`${BASE_URL}/admin/order/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
        body: JSON.stringify({ status: data }),
      });
      dispatch(getAdminData());
      toast({
        title: 'Order Status Updated',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};


export function AddProduct(data, toast) {
  console.log("Add data", data);
  return async function (dispatch, getState) {
    const userId = localStorage.getItem("TOKEN");
    try {
      const sendData = await fetch(`${BASE_URL}/admin/product`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${userId}`,
        },
        body: JSON.stringify(data),
      });

      await sendData.json();
      toast({
        title: 'Product Added successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      dispatch(getAdminData());
    } catch (err) {
      console.log("err", err);
    }
  };
}
