import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    const data = await db.listCategories();
    return NextResponse.json({ data });
}

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const { name, description } = body as { name?: string; description?: string };
    if (!name?.trim()) {
        return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }
    const category = await db.createCategory({ name: name.trim(), description: description ?? null });
    return NextResponse.json({ data: category }, { status: 201 });
}
