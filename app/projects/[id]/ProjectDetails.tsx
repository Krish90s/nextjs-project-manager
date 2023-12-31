import { StatusBadge } from "@/app/components";
import { Project } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import Markdown from "react-markdown";

const ProjectDetails = ({ project }: { project: Project }) => {
  return (
    <>
      <Heading>{project.title}</Heading>
      <Flex className="space-x-3" my="2">
        <StatusBadge status={project.status} />
        <Text>{project.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <Markdown>{project.description}</Markdown>
      </Card>
    </>
  );
};

export default ProjectDetails;
