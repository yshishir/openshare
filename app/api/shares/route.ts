import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { files, password } = body;

    let passwordHash = null;
    passwordHash = await bcrypt.hash(password.trim(),10);

}