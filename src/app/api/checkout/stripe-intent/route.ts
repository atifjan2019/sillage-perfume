import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const { customer_name, email, phone, address, city, postal_code, items, notes, session_id } = body as {
        customer_name?: string;
        email?: string;
        phone?: string;
        address?: string;
        city?: string;
        postal_code?: string;
        items?: { product_id: number; qty: number }[];
        notes?: string;
        session_id?: string;
    };
    if (!customer_name || !email || !phone || !address || !city || !postal_code || !items?.length) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    try {
        const order = await db.createOrder({
            customer_name,
            email,
            phone,
            address,
            city,
            postal_code,
            items,
            payment_method: "stripe",
            notes,
        });
        if (session_id) await db.markCartConverted(session_id);
        const client_secret = `pi_${Date.now().toString(36)}_secret_mock_${order.id}`;
        return NextResponse.json({ data: order, order_no: order.order_no, client_secret }, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Order failed";
        return NextResponse.json({ message }, { status: 400 });
    }
}
