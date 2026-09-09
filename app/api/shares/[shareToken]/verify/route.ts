import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type VerifyRouteProps = {
  params: Promise<{
    shareToken: string;
  }>;
};

export async function POST(
  req: Request,
  { params }: VerifyRouteProps,
) {
  const { shareToken } = await params;
  const { password } = await req.json();

  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 },
    );
  }

  const share = await prisma.share.findUnique({
    where: {
      shareToken,
    },
    select: {
      passwordHash: true,
      expiresAt: true,
      files: {
        select: {
          id: true,
          name: true,
          size: true,
          type: true,
          cloudinaryUrl: true,
        },
      },
    },
  });

  if (!share) {
    return NextResponse.json(
      { error: "Share link not found" },
      { status: 404 },
    );
  }

  if (share.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "This share link has expired" },
      { status: 410 },
    );
  }

  if (!share.passwordHash) {
    return NextResponse.json(
      { error: "This link is not password protected" },
      { status: 400 },
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    share.passwordHash,
  );

  if (!isPasswordCorrect) {
    return NextResponse.json(
      { error: "Incorrect password" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    files: share.files,
  });
}