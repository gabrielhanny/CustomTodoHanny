import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";

interface OptimisticState {
  todos: Todo[];
  previousTodos: Todo[]; // Untuk rollback jika gagal
}

const initialState: OptimisticState = {
  todos: [],
  previousTodos: [],
};

const optimisticSlice = createSlice({
  name: "optimistic",
  initialState,
  reducers: {
    optimisticAddTodo: (state, action: PayloadAction<Todo>) => {
      state.previousTodos = [...state.todos]; // Simpan state sebelumnya
      state.todos.push(action.payload);
    },
    optimisticUpdateTodo: (state, action: PayloadAction<Todo>) => {
      state.previousTodos = [...state.todos]; // Simpan state sebelumnya
      state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
    },
    optimisticDeleteTodo: (state, action: PayloadAction<number>) => {
      state.previousTodos = [...state.todos]; // Simpan state sebelumnya
      // state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = state.todos.filter((todo) => todo.id !== String(action.payload));
    },
    rollbackTodos: (state) => {
      state.todos = [...state.previousTodos]; // Rollback jika gagal
    },
  },
});

export const { optimisticAddTodo, optimisticUpdateTodo, optimisticDeleteTodo, rollbackTodos } = optimisticSlice.actions;
export default optimisticSlice.reducer;
