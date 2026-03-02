export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
    products_count?: number;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    description: string | null;
    price: string;
    sale_price: string | null;
    sku: string | null;
    stock: number;
    images: string[] | null;
    status: 'active' | 'inactive';
    category?: Category;
    created_at: string;
}

export interface CartItem {
    product: Product;
    qty: number;
}

export interface Order {
    id: number;
    order_no: string;
    customer_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    subtotal: string;
    shipping: string;
    discount: string;
    total: string;
    payment_method: 'cod' | 'stripe';
    payment_status: string;
    status: string;
    items: OrderItem[];
    created_at: string;
}

export interface OrderItem {
    id: number;
    product_id: number;
    name_snapshot: string;
    price_snapshot: string;
    qty: number;
    line_total: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
