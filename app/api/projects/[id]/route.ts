import { projectSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
