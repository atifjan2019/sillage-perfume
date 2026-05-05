import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const { email, password, passcode } = body as { email?: string; password?: string; passcode?: string };

    let user = null;
    if (passcode) {
        user = await db.findUserByPasscode(passcode);
        if (!user) {
            return NextResponse.json({ message: "Invalid passcode" }, { status: 401 });
        }
    } else {
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password required" }, { status: 400 });
        }
        const found = await db.findUserByEmail(email);
        if (!found || found.password !== password) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        user = found;
    }

    const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString("base64url");
    return NextResponse.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
}
