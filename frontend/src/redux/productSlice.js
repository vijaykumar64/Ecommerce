// redux/productSlice.js
const { createSlice } = require('@reduxjs/toolkit');
const BASE_URL = 'http://localhost:8001';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],         // all products
    categories: [],   // all unique categories
    status: STATUSES.IDLE,
    categoryStatus: STATUSES.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCategoryStatus(state, action) {
      state.categoryStatus = action.payload;
    },
  },
});

export const {
  setProducts,
  setCategories,
  setStatus,
  setCategoryStatus,
} = productSlice.actions;
export default productSlice.reducer;

// Thunk to fetch products// Thunk to fetch products
export function fetchProducts(page, categories = [], filter = 1) {
  return async function fetchProductThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const params = new URLSearchParams();
      params.append("filter", filter);

      categories.forEach((cat) => {
        params.append("category", cat);
      });

      const res = await fetch(`${BASE_URL}/product?${params.toString()}`);
      const data = await res.json();

      dispatch(setProducts(data.products || data)); // Handle both `{ products: [...] }` and `[...]`
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}


    
// Thunk to fetch categories
export function fetchCategories() {
  return async function fetchCategoryThunk(dispatch) {
    dispatch(setCategoryStatus(STATUSES.LOADING));
    try {
      const res = await fetch(`${BASE_URL}/product/category`);
      const data = await res.json();
      dispatch(setCategories(data));
      dispatch(setCategoryStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setCategoryStatus(STATUSES.ERROR));
    }
  };
}
