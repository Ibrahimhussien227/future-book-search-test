import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      const user = JSON.parse(localStorage.getItem("CURRENT_USER"));
      headers.set("X-Requested-With", "XMLHttpRequest");
      headers.set("Content-Type", "application/json");

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
      }),
    }),

    getAuthors: builder.query({
      query: ({ search, page }) => ({
        url: `/getAuthors?search=${search}&page=${page}`,
      }),
    }),
    getSources: builder.query({
      query: ({ search, page }) => ({
        url: `/getSources?search=${search}&page=${page}`,
      }),
    }),
    getPreferences: builder.query({
      query: () => ({
        url: `/preferences`,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
    }),
    signup: builder.mutation({
      query: (payload) => ({
        url: "/signup",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    postPreferences: builder.mutation({
      query: (payload) => ({
        url: `/preferences`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useLazyGetAuthorsQuery,
  useLazyGetSourcesQuery,
  useGetPreferencesQuery,
  usePostPreferencesMutation,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = newsApi;
