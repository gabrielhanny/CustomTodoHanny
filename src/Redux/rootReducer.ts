import { combineReducers } from "redux"; // Import fungsi untuk menggabungkan beberapa reducer
import optimisticReducer from "./slices/optimisticSlice";
import infiniteScrollReducer from "./slices/infinityscrollSlice";
// Menggabungkan semua reducer dalam satu rootReducer
const rootReducer = combineReducers({
  optimistic: optimisticReducer,
  infiniteScroll: infiniteScrollReducer,
});

export default rootReducer; // Export rootReducer agar bisa digunakan di store
