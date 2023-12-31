import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { StatusBadge } from "@/app/components";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const ProjectDetailsPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{project.title}</Heading>
        <Flex className="space-x-3" my="2">
          <StatusBadge status={project.status} />
          <Text>{project.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <Markdown>{project.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${project.id}/edit`}>Edit Project</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default ProjectDetailsPage;
