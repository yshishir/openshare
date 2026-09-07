import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 401 },
    );
  }

  const { files, password } = await req.json();

  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: "Please upload at least one file" },
      { status: 400 },
    );
  }

  const passwordHash = password
    ? await bcrypt.hash(password, 10)
    : null;

  const share = await prisma.share.create({
    data: {
      shareToken: randomUUID(),
      userId: session.user.id,
      passwordHash,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),

      files: {
        create: files.map((file: {
          name: string;
          size: number;
          type: string;
          publicId: string;
          url: string;
        }) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          cloudinaryPublicId: file.publicId,
          cloudinaryUrl: file.url,
        })),
      },
    },
  });

  return NextResponse.json({
    shareToken: share.shareToken,
  });
}