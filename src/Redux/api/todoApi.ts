import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://67e001737635238f9aac3b90.mockapi.io/api/todoku", // Base URL tetap sama
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todosaya?sortBy=id&order=desc", // Tambahkan sorting DESC
      providesTags: ["Todo"],
    }),

    createTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todosaya", // Ganti `/todos` dengan `/todosaya`
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todosaya/${id}`, // Ganti `/todos` dengan `/todosaya`
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todosaya/${id}`, // Ganti `/todos` dengan `/todosaya`
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi;
