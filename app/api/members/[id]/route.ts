import { memberSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
// import authOptions from "../../auth/[...nextauth]/authOptions";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const member = await prisma.member.findFirst({
    where: { userId: params.id },
  });

  if (!member)
    return NextResponse.json({ error: "Invalid Member" }, { status: 400 });

  await prisma.member.deleteMany({
    where: { userId: params.id },
  });

  return NextResponse.json({});
}
