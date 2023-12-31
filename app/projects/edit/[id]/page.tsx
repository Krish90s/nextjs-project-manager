import { notFound } from "next/navigation";
import React from "react";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";

const ProjectForm = dynamic(
  () => import("@/app/projects/_components/ProjectForm"),
  { ssr: false, loading: () => <p>Loading...</p> }
);

interface Props {
  params: { id: string };
}

const EditProjectPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) notFound();

  return (
    <div>
      <ProjectForm project={project} />
    </div>
  );
};

export default EditProjectPage;
