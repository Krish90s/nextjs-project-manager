import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditProjectButton from "./EditProjectButton";
import ProjectDetails from "./ProjectDetails";
import DeleteProjectButton from "./DeleteProjectButton";

interface Props {
  params: { id: string };
}

const ProjectDetailsPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="md:col-span-4">
        <ProjectDetails project={project} />
      </Box>
      <Box>
        <Flex direction="column" gap="1">
          <EditProjectButton issueId={project.id} />
          <DeleteProjectButton issueId={project.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default ProjectDetailsPage;
