import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'api/api';
const initialState = {
    products: [],
    singleProduct: [],
    sellerProducts: [],
    cart: [],
    successMessage: "",
    errorMessage: "",
};

export const getProductsAsync = createAsyncThunk(
    "products/getProducts",
    async (category) => {
        try {
            if (category) {
                const response = await axiosInstance.get(`/product/category/?category=${category}`)
                return response.data.results
            } else {
                const response = await axiosInstance.get(`/products`);
                return response.data.results
            }
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const getProductAsync = createAsyncThunk(
    "products/getProduct",
    async (id) => {
        try {
            const response = await axiosInstance.get(`product/pid?pid=${id}`);
            return response.data.results[0]
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const getSellerProductsAsync = createAsyncThunk(
    "products/getSellerProducts",
    async (user) => {
        try {
            const response = await axiosInstance.post("/seller/product", user);
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const addProductsAsync = createAsyncThunk(
    "products/addProducts",
    async (data) => {
        try {
            console.log(data)
            const response = await axiosInstance.post("seller/product/add", data)
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const updateProductAsync = createAsyncThunk(
    "products/updateProducts",
    async (data) => {
        try {
            console.log(data)
            const response = await axiosInstance.put(`seller/product/update?pid=${data['pid']}`, {
                'product': data['product'],
                'username': data['username'],
            })
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)
export const deleteProductAsync = createAsyncThunk(
    "products/deleteProducts",
    async (data) => {
        try {
            console.log(data)
            const response = await axiosInstance.delete(`seller/product/delete?pid=${data['pid']}`, {
                data: { 'username': data['username'] },
            })
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const addToCartAsync = createAsyncThunk(
    "products/addToCart",
    async (data) => {
        try {
            console.log(data)
            const response = await axiosInstance.post(`/cart/add?pid=${data['pid']}&qty=${data['qty']}`, { username: data['username'] })
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const displayCartAsync = createAsyncThunk(
    "products/displayCart",
    async (username) => {
        try {
            console.log(username)
            const response = await axiosInstance.post(`/cartitems`, { 'username': username })
            return response.data.data.cartItem
        } catch (err) {
            throw new Error(err);
        }
    }
)

export const deleteCartAsync = createAsyncThunk(
    "products/deleteCart",
    async (pid) => {
        try {
            console.log(pid)
            const response = await axiosInstance.delete(`/cartitems/delete?pid=${pid}`, {
                data: { 'username': localStorage.getItem("username") },
            })
            return response.data
        } catch (err) {
            throw new Error(err);
        }
    }
)
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearSuccessMessage: (state, action) => {
            state.successMessage = ""
        },

    },
    extraReducers: {
        [getProductsAsync.fulfilled]: (state, action) => {
            state.products = []
            return action.payload.forEach((item) => state.products.push(item))
        },

        [getProductAsync.fulfilled]: (state, action) => {
            state.singleProduct = action.payload
        },

        [getSellerProductsAsync.fulfilled]: (state, action) => {
            state.sellerProducts = action.payload.data
        },

        [addProductsAsync.fulfilled]: (state, action) => {
            state.successMessage = action.payload.successMessage
        },

        [updateProductAsync.fulfilled]: (state, action) => {
            state.successMessage = action.payload.successMessage
        },

        [deleteProductAsync.fulfilled]: (state, action) => {
            state.successMessage = action.payload.successMessage
        },

        [addToCartAsync.fulfilled]: (state, action) => {
            state.successMessage = action.payload.successMessage
        },

        [displayCartAsync.fulfilled]: (state, action) => {
            state.cart = action.payload
        },

        [deleteCartAsync.fulfilled]: (state, action) => {
            state.successMessage = action.payload.successMessage
        },


    },

});

export const { clearSuccessMessage } = productSlice.actions;


export default productSlice.reducer  