import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import StatusBadge from "@/app/components/StatusBadge";
import Markdown from "react-markdown";
import delay from "delay";

interface Props {
  params: { id: string };
}

const ProjectDetailsPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project) notFound();

  await delay(2000);

  return (
    <div>
      <Heading>{project.title}</Heading>
      <Flex className="space-x-3" my="2">
        <StatusBadge status={project.status} />
        <Text>{project.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <Markdown>{project.description}</Markdown>
      </Card>
    </div>
  );
};

export default ProjectDetailsPage;
