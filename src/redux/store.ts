// /src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

// Tạo kiểu RootState từ store
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
