import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const result = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(result, { status: 200 });
}
