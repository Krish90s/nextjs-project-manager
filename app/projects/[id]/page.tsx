import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditProjectButton from "./EditProjectButton";
import ProjectDetails from "./ProjectDetails";

interface Props {
  params: { id: string };
}

const ProjectDetailsPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <ProjectDetails project={project} />
      </Box>
      <Box>
        <EditProjectButton issueId={project.id} />
      </Box>
    </Grid>
  );
};

export default ProjectDetailsPage;
