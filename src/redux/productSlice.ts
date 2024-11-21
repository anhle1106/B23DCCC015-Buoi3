import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the product type and export it for use elsewhere
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;  // This field is only used when adding a new product
}

// Type used only for editing, excluding category field
export interface ProductToEdit {
  id: number;
  name: string;
  price: number;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);  // Add product to state
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(product => product.id !== action.payload);  // Remove product by id
    },
    editProduct: (state, action: PayloadAction<ProductToEdit>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        // Update product without changing category
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
  },
});

export const { addProduct, deleteProduct, editProduct } = productSlice.actions;

export default productSlice.reducer;
