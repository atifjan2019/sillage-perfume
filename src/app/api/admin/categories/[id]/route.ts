import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (Number.isNaN(numId)) {
        return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }
    const ok = await db.deleteCategory(numId);
    if (!ok) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
}
