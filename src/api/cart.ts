import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/supabase-client";

interface Cart {
  productId: string;
  quantity: number;
  userId: string;
}

interface Wishlist {
  productId: string;
  userId: string;
}

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload: Cart, { rejectWithValue }) => {
    try {
      // First, check if item exists in database
      const { data: existingItem, error: fetchError } = await supabase
        .from("cart")
        .select("*")
        .eq("product_id", payload.productId)
        .eq("user_id", payload.userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 is "not found" error, which is expected for new items
        throw fetchError;
      }

      if (existingItem) {
        // Update existing item
        const newQuantity = existingItem.quantity + payload.quantity;
        const { data, error } = await supabase
          .from("cart")
          .update({ quantity: newQuantity })
          .eq("product_id", payload.productId)
          .eq("user_id", payload.userId)
          .select()
          .single();

        if (error) throw error;
        return { ...payload, quantity: newQuantity, isUpdate: true };
      } else {
        // Insert new item
        const { data, error } = await supabase
          .from("cart")
          .insert({
            product_id: payload.productId,
            quantity: payload.quantity,
            user_id: payload.userId,
          })
          .select()
          .single();

        if (error) throw error;
        return { ...payload, isUpdate: false };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      return data.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        userId: item.user_id,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [] as Cart[],
    wishlistItems: [] as Wishlist[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    // Synchronous reducers for local state management
    clearError(state) {
      state.error = null;
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart async
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const { isUpdate } = action.payload;

        if (isUpdate) {
          // Update existing item
          const existingItem = state.cartItems.find(
            (item) => item.productId === action.payload.productId
          );
          if (existingItem) {
            existingItem.quantity = action.payload.quantity;
          }
        } else {
          // Add new item
          state.cartItems.push({
            productId: action.payload.productId,
            quantity: action.payload.quantity,
            userId: action.payload.userId,
          });
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
