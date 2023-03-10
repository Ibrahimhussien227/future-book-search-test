import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json",
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      const user = JSON.parse(localStorage.getItem("CURRENT_USER"));

      if (user && endpoint !== "refresh") {
        headers.set("Authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ page, searchTerm, authorIds, sourceIds }) => ({
        url: `/getArticles?page=${page}&search=${searchTerm}&authors=${authorIds}&sources=${sourceIds}`,
        headers: newsApiHeaders,
      }),
    }),
    getAuthors: builder.query({
      query: ({ search, page }) => ({
        url: `/getAuthors?search=${search}&page=${page}`,
        headers: newsApiHeaders,
      }),
    }),
    getSources: builder.query({
      query: ({ search, page }) => ({
        url: `/getSources?search=${search}&page=${page}`,
        headers: newsApiHeaders,
      }),
    }),
    getPreferences: builder.query({
      query: () => ({
        url: `/preferences`,
        headers: newsApiHeaders,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
        headers: newsApiHeaders,
      }),
    }),
    signup: builder.mutation({
      query: (payload) => ({
        url: "/signup",
        method: "POST",
        body: payload,
        headers: newsApiHeaders,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: newsApiHeaders,
      }),
    }),
    postPreferences: builder.mutation({
      query: (payload) => ({
        url: `/preferences`,
        method: "POST",
        body: payload,
        headers: newsApiHeaders,
      }),
    }),
  }),
});

export const {
  useLazyGetArticlesQuery,
  useGetArticlesQuery,
  useLazyGetAuthorsQuery,
  useGetAuthorsQuery,
  useLazyGetSourcesQuery,
  useGetSourcesQuery,
  useGetPreferencesQuery,
  usePostPreferencesMutation,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = newsApi;
