import type { CategoryProducts } from "@/types/CategoryProducts";
import type { Products } from "@/types/Products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
  endpoints: (builder) => ({
    getCategory: builder.query<string[], string>({
      query: () => "/category-list",
    }),
    getProductsByCategory: builder.query<CategoryProducts, string | undefined>({
      query: (categoryName) => `/category/${categoryName}`,
    }),
    getProducts: builder.query<CategoryProducts, string | undefined>({
      query: () => ``,
    }),
    getProductsById: builder.query<Products, string | undefined>({
      query: (id) => `/${id}`,
    }),
  }),
});
export const {
  useGetCategoryQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
  useGetProductsByIdQuery,
} = categoryApi;
