"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { CartItem, Product } from "./types";

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, qty?: number) => void;
    removeItem: (productId: number) => void;
    updateQty: (productId: number, qty: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("swan_cart");
        if (saved) {
            try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
        }
        setLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("swan_cart", JSON.stringify(items));
        }
    }, [items, loaded]);

    const addItem = useCallback((product: Product, qty = 1) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.product.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
                );
            }
            return [...prev, { product, qty }];
        });
    }, []);

    const removeItem = useCallback((productId: number) => {
        setItems((prev) => prev.filter((i) => i.product.id !== productId));
    }, []);

    const updateQty = useCallback((productId: number, qty: number) => {
        if (qty <= 0) {
            setItems((prev) => prev.filter((i) => i.product.id !== productId));
            return;
        }
        setItems((prev) =>
            prev.map((i) => (i.product.id === productId ? { ...i, qty } : i))
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => {
        const price = parseFloat(i.product.sale_price || i.product.price);
        return sum + price * i.qty;
    }, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, itemCount, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
