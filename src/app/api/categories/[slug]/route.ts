import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await db.getCategoryBySlug(slug);
    if (!category) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ data: category });
}
