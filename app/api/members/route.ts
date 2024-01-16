import { memberSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
// import authOptions from "../../auth/[...nextauth]/authOptions";

export async function POST(request: NextRequest) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = memberSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const result = await prisma.member.create({ data: body });

  return NextResponse.json(result, { status: 201 });
}
