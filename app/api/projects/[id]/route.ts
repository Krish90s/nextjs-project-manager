import { projectSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = projectSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project)
    return NextResponse.json({ error: "Invalid Project" }, { status: 400 });

  const updatedProject = await prisma.project.update({
    where: { id: params.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedProject, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project)
    return NextResponse.json({ error: "Invalid Project" }, { status: 400 });

  await prisma.project.delete({
    where: { id: params.id },
  });

  return NextResponse.json({});
}
