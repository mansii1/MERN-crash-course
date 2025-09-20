import axios from "axios";
import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "All fields are required" };
        }
        const res = await axios.post("/api/products", newProduct);
        if (res.data.success) {
            set((state) => ({ products: [...state.products, res.data.data] }));
            return { success: true, message: "Product added successfully" };
        }
        return { success: false, message: "Failed to add product" };
    },
    fetchProducts: async () => {
        const res = await axios.get("/api/products");
        if (res.data.success) {
            set({ products: res.data.data });
        }
    },
    deleteProduct: async (productId) => {
        const res = await axios.delete(`/api/products/${productId}`);
        if (res.data.success) {
            set((state) => ({ products: state.products.filter((product) => product._id !== productId) }));
            return { success: true, message: res.data.message };
        }
        return { success: false, message: res.data.message };
    },
    updateProductFunc: async (productId, updatedProduct) => {
        const res = await axios.put(`/api/products/${productId}`, updatedProduct);
        if (res.data.success) {
            set((state) => ({ products: state.products.map((product) => product._id === productId ? res.data.data : product) }));
            return { success: true, message: res.data.message };
        }
        return { success: false, message: res.data.message };
    },
}));
