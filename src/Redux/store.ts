import { configureStore } from "@reduxjs/toolkit";
import optimisticReducer from "./slices/optimisticSlice";
import infiniteScrollReducer from "./slices/infinityscrollSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todoApi } from "./api/todoApi";

const store = configureStore({
  reducer: {
    optimistic: optimisticReducer,
    infiniteScroll: infiniteScrollReducer,
    [todoApi.reducerPath]: todoApi.reducer, // 🔥 Tambahkan RTK Query reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware), // 🔥 Tambahkan middleware
});

setupListeners(store.dispatch); // Untuk handling refetch otomatis
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
