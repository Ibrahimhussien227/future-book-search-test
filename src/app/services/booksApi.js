import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const params = {
  key: import.meta.env.VITE_GOOGLE_KEY,
};

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ q, category, sortby, size }) => ({
        url: `/volumes?q=${q}+subject:${category}&orderBy=${sortby}&maxResults=30&startIndex=${size}`,
        params,
      }),
    }),
    getBookDetails: builder.query({
      query: (bookId) => ({
        url: `/volumes/${bookId}`,
        params,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useGetBookDetailsQuery } = booksApi;
