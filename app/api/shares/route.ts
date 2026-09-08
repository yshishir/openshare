import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

type UploadedFile = {
  url: string;
  publicId: string;
  name: string;
  size: number;
  type: string;
};

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const files = body.files as UploadedFile[];
    const password =
      typeof body.password === "string"
        ? body.password.trim()
        : "";

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: "At least one file is required" },
        { status: 400 },
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { error: "You can upload a maximum of 5 files" },
        { status: 400 },
      );
    }

    for (const file of files) {
      if (
        typeof file.url !== "string" ||
        typeof file.publicId !== "string" ||
        typeof file.name !== "string" ||
        typeof file.type !== "string" ||
        typeof file.size !== "number" ||
        file.size < 0
      ) {
        return NextResponse.json(
          { error: "Invalid file data" },
          { status: 400 },
        );
      }
    }

    if (password && password.length < 4) {
      return NextResponse.json(
        { error: "Password must be at least 4 characters" },
        { status: 400 },
      );
    }

    const passwordHash = password
      ? await bcrypt.hash(password, 10)
      : null;

    const shareToken = randomBytes(32).toString("hex");

    const expiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000,
    );

    const share = await prisma.share.create({
      data: {
        shareToken,
        userId: session.user.id,
        passwordHash,
        expiresAt,

        files: {
          create: files.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            cloudinaryPublicId: file.publicId,
            cloudinaryUrl: file.url,
            userId: session.user.id,
          })),
        },
      },
    });

    return NextResponse.json(
      {
        shareToken: share.shareToken,
        expiresAt: share.expiresAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create share error:", error);

    return NextResponse.json(
      { error: "Failed to create share" },
      { status: 500 },
    );
  }
}