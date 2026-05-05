import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const perPageRaw = searchParams.get("per_page");
    const perPage = perPageRaw ? Math.max(1, parseInt(perPageRaw, 10)) : 50;
    const result = await db.listOrders(perPage);
    return NextResponse.json(result);
}
