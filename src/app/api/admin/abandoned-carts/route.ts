import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    const carts = await db.listAbandonedCarts();
    return NextResponse.json({ data: carts, total: carts.length });
}
