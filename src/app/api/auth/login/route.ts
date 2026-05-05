import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body as { email?: string; password?: string };
    if (!email || !password) {
        return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }
    const user = await db.findUserByEmail(email);
    if (!user || user.password !== password) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString("base64url");
    return NextResponse.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
}
