"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { CartItem, Product } from "./types";

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, qty?: number) => void;
    removeItem: (productId: number) => void;
    updateQty: (productId: number, qty: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
    sessionId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function ensureSessionId(): string {
    let id = localStorage.getItem("sillage_session_id");
    if (!id) {
        id = (typeof crypto !== "undefined" && "randomUUID" in crypto)
            ? crypto.randomUUID()
            : `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem("sillage_session_id", id);
    }
    return id;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("sillage_cart");
        if (saved) {
            try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
        }
        setSessionId(ensureSessionId());
        setLoaded(true);
    }, []);

    // Save to localStorage and sync to server (debounced)
    useEffect(() => {
        if (!loaded || !sessionId) return;
        localStorage.setItem("sillage_cart", JSON.stringify(items));
        if (syncTimer.current) clearTimeout(syncTimer.current);
        syncTimer.current = setTimeout(() => {
            const payload = {
                session_id: sessionId,
                items: items.map((i) => ({ product_id: i.product.id, qty: i.qty })),
            };
            fetch("/api/cart/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }).catch(() => { /* ignore network errors */ });
        }, 800);
        return () => {
            if (syncTimer.current) clearTimeout(syncTimer.current);
        };
    }, [items, loaded, sessionId]);

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
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, itemCount, subtotal, sessionId }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
