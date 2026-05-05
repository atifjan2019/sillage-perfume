import { NextResponse } from "next/server";
import { db, SiteSettings } from "@/lib/db";

export async function GET() {
    const data = await db.getSiteSettings();
    return NextResponse.json({ data });
}

export async function PUT(req: Request) {
    const body = (await req.json().catch(() => ({}))) as Partial<SiteSettings>;
    const data = await db.updateSiteSettings(body);
    return NextResponse.json({ data });
}
