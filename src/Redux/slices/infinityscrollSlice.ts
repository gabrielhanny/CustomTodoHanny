import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";

interface InfinityScrollState {
  todos: Todo[];
  page: number;
  hasMore: boolean;
}

const initialState: InfinityScrollState = {
  todos: [],
  page: 1,
  hasMore: true, // Jika `false`, berarti semua data sudah di-fetch
};

const infinityScrollSlice = createSlice({
  name: "infinityScroll",
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = [...state.todos, ...action.payload];
      state.page += 1;
      state.hasMore = action.payload.length > 0; // Jika kosong, tidak ada data lagi
    },
    resetTodos: (state) => {
      state.todos = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
});

export const { addTodos, resetTodos } = infinityScrollSlice.actions;
export default infinityScrollSlice.reducer;
