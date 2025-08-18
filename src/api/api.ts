import cartReducer from "./cart";
import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "./categories";

export const store = configureStore({
  reducer: {
    cartItems: cartReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware),
});
