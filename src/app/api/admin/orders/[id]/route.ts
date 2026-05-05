import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (Number.isNaN(numId)) {
        return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }
    const body = await req.json().catch(() => ({}));
    const { status } = body as { status?: string };
    if (!status) {
        return NextResponse.json({ message: "status is required" }, { status: 400 });
    }
    const order = await db.updateOrderStatus(numId, status);
    if (!order) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ data: order });
}
