import { promises as fs } from "fs";
import path from "path";
import { Category, Product, Order, OrderItem } from "./types";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "admin" | "customer";
}

interface DBShape {
    categories: Category[];
    products: Product[];
    users: User[];
    orders: Order[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const SEED_FILE = path.join(DATA_DIR, "seed.json");

let memo: DBShape | null = null;
let writeChain: Promise<void> = Promise.resolve();

async function load(): Promise<DBShape> {
    if (memo) return memo;
    try {
        const raw = await fs.readFile(DB_FILE, "utf-8");
        memo = JSON.parse(raw);
    } catch {
        const raw = await fs.readFile(SEED_FILE, "utf-8");
        memo = JSON.parse(raw);
        await fs.writeFile(DB_FILE, JSON.stringify(memo, null, 2), "utf-8");
    }
    return memo!;
}

async function persist(): Promise<void> {
    if (!memo) return;
    const snapshot = JSON.stringify(memo, null, 2);
    writeChain = writeChain.then(() => fs.writeFile(DB_FILE, snapshot, "utf-8"));
    return writeChain;
}

function slugify(s: string): string {
    return s
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function nextId(items: { id: number }[]): number {
    return items.reduce((max, x) => (x.id > max ? x.id : max), 0) + 1;
}

function withCount(cat: Category, products: Product[]): Category {
    return { ...cat, products_count: products.filter((p) => p.category_id === cat.id).length };
}

export const db = {
    async listCategories(): Promise<Category[]> {
        const d = await load();
        return d.categories.map((c) => withCount(c, d.products));
    },

    async getCategoryBySlug(slug: string): Promise<Category | null> {
        const d = await load();
        const cat = d.categories.find((c) => c.slug === slug);
        return cat ? withCount(cat, d.products) : null;
    },

    async listProducts(opts?: { categorySlug?: string; perPage?: number }): Promise<{ data: Product[]; total: number; per_page: number; current_page: number; last_page: number }> {
        const d = await load();
        const perPage = opts?.perPage ?? 20;
        let products = d.products.filter((p) => p.status === "active");
        if (opts?.categorySlug) {
            const cat = d.categories.find((c) => c.slug === opts.categorySlug);
            if (!cat) return { data: [], total: 0, per_page: perPage, current_page: 1, last_page: 1 };
            products = products.filter((p) => p.category_id === cat.id);
        }
        const total = products.length;
        const sliced = products.slice(0, perPage).map((p) => ({
            ...p,
            category: d.categories.find((c) => c.id === p.category_id),
        }));
        return { data: sliced, total, per_page: perPage, current_page: 1, last_page: Math.max(1, Math.ceil(total / perPage)) };
    },

    async getProductBySlug(slug: string): Promise<{ product: Product; related: Product[] } | null> {
        const d = await load();
        const product = d.products.find((p) => p.slug === slug);
        if (!product) return null;
        const enriched = { ...product, category: d.categories.find((c) => c.id === product.category_id) };
        const related = d.products
            .filter((p) => p.category_id === product.category_id && p.id !== product.id && p.status === "active")
            .slice(0, 4)
            .map((p) => ({ ...p, category: d.categories.find((c) => c.id === p.category_id) }));
        return { product: enriched, related };
    },

    async listAllProducts(perPage = 50): Promise<{ data: Product[]; total: number; per_page: number }> {
        const d = await load();
        const enriched = d.products.map((p) => ({
            ...p,
            category: d.categories.find((c) => c.id === p.category_id),
        }));
        return { data: enriched.slice(0, perPage), total: d.products.length, per_page: perPage };
    },

    async createCategory(input: { name: string; description?: string | null }): Promise<Category> {
        const d = await load();
        const cat: Category = {
            id: nextId(d.categories),
            name: input.name,
            slug: slugify(input.name),
            image: null,
            description: input.description ?? null,
        };
        d.categories.push(cat);
        await persist();
        return withCount(cat, d.products);
    },

    async deleteCategory(id: number): Promise<boolean> {
        const d = await load();
        const before = d.categories.length;
        d.categories = d.categories.filter((c) => c.id !== id);
        d.products = d.products.filter((p) => p.category_id !== id);
        if (d.categories.length === before) return false;
        await persist();
        return true;
    },

    async createProduct(input: {
        category_id: number;
        name: string;
        description?: string | null;
        price: number;
        sale_price?: number | null;
        sku?: string | null;
        stock: number;
        status?: "active" | "inactive";
    }): Promise<Product> {
        const d = await load();
        const product: Product = {
            id: nextId(d.products),
            category_id: input.category_id,
            name: input.name,
            slug: slugify(input.name),
            description: input.description ?? null,
            price: String(input.price),
            sale_price: input.sale_price != null ? String(input.sale_price) : null,
            sku: input.sku ?? null,
            stock: input.stock,
            images: null,
            status: input.status ?? "active",
            created_at: new Date().toISOString(),
        };
        d.products.push(product);
        await persist();
        return { ...product, category: d.categories.find((c) => c.id === product.category_id) };
    },

    async deleteProduct(id: number): Promise<boolean> {
        const d = await load();
        const before = d.products.length;
        d.products = d.products.filter((p) => p.id !== id);
        if (d.products.length === before) return false;
        await persist();
        return true;
    },

    async findUserByEmail(email: string): Promise<User | null> {
        const d = await load();
        return d.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
    },

    async createOrder(input: {
        customer_name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        postal_code: string;
        items: { product_id: number; qty: number }[];
        payment_method: "cod" | "stripe";
        notes?: string;
    }): Promise<Order> {
        const d = await load();
        const orderItems: OrderItem[] = [];
        let subtotalCents = 0;

        let nextItemId = nextId(d.orders.flatMap((o) => o.items ?? [])) - 1;
        for (const item of input.items) {
            const product = d.products.find((p) => p.id === item.product_id);
            if (!product) throw new Error(`Product ${item.product_id} not found`);
            const unit = parseFloat(product.sale_price ?? product.price);
            const lineTotal = unit * item.qty;
            subtotalCents += Math.round(lineTotal * 100);
            nextItemId += 1;
            orderItems.push({
                id: nextItemId,
                product_id: product.id,
                name_snapshot: product.name,
                price_snapshot: String(unit),
                qty: item.qty,
                line_total: lineTotal.toFixed(2),
            });
        }

        const subtotal = subtotalCents / 100;
        const shipping = subtotal >= 5000 ? 0 : 500;
        const total = subtotal + shipping;
        const id = nextId(d.orders);
        const order: Order = {
            id,
            order_no: `SLG-${Date.now().toString(36).toUpperCase()}-${id}`,
            customer_name: input.customer_name,
            email: input.email,
            phone: input.phone,
            address: input.address,
            city: input.city,
            postal_code: input.postal_code,
            subtotal: subtotal.toFixed(2),
            shipping: shipping.toFixed(2),
            discount: "0.00",
            total: total.toFixed(2),
            payment_method: input.payment_method,
            payment_status: input.payment_method === "cod" ? "pending" : "pending",
            status: input.payment_method === "cod" ? "cod_pending" : "pending_payment",
            items: orderItems,
            created_at: new Date().toISOString(),
        };
        d.orders.push(order);
        await persist();
        return order;
    },

    async listOrders(perPage = 50): Promise<{ data: Order[]; total: number; per_page: number }> {
        const d = await load();
        const sorted = [...d.orders].sort((a, b) => b.id - a.id);
        return { data: sorted.slice(0, perPage), total: d.orders.length, per_page: perPage };
    },

    async updateOrderStatus(id: number, status: string): Promise<Order | null> {
        const d = await load();
        const order = d.orders.find((o) => o.id === id);
        if (!order) return null;
        order.status = status;
        await persist();
        return order;
    },
};
