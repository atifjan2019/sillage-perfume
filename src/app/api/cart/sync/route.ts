import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const { session_id, email, items } = body as {
        session_id?: string;
        email?: string | null;
        items?: { product_id: number; qty: number }[];
    };
    if (!session_id) {
        return NextResponse.json({ message: "session_id required" }, { status: 400 });
    }
    const cart = await db.upsertCart({ session_id, email: email ?? null, items: items ?? [] });
    return NextResponse.json({ data: cart });
}
