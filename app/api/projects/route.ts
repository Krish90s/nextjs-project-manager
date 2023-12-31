import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { projectSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = projectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const result = await prisma.project.create({ data: body });

  return NextResponse.json(result, { status: 201 });
}
