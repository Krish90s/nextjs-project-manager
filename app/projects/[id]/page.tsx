import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditProjectButton from "./EditProjectButton";
import ProjectDetails from "./ProjectDetails";
import DeleteProjectButton from "./DeleteProjectButton";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const ProjectDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="md:col-span-4">
        <ProjectDetails project={project} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="1">
            <AssigneeSelect />
            <EditProjectButton issueId={project.id} />
            <DeleteProjectButton issueId={project.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default ProjectDetailsPage;
