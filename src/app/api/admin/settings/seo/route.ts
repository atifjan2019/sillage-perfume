import { NextResponse } from "next/server";
import { db, SeoSettings } from "@/lib/db";

export async function GET() {
    const data = await db.getSeoSettings();
    return NextResponse.json({ data });
}

export async function PUT(req: Request) {
    const body = (await req.json().catch(() => ({}))) as Partial<SeoSettings>;
    const data = await db.updateSeoSettings(body);
    return NextResponse.json({ data });
}
