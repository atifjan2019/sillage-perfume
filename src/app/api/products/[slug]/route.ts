import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const result = await db.getProductBySlug(slug);
    if (!result) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ data: result.product, related: result.related });
}
