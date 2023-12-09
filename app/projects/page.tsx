import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import prisma from "@/prisma/client";

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany();

  console.log(projects);
  return (
    <div>
      <Button>
        <Link href="/projects/new">New Project</Link>
      </Button>
      <Table.Root className="mt-5" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Project</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created On
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projects.map((project) => (
            <Table.Row key={project.id}>
              <Table.RowHeaderCell>
                {project.title}
                <div className="block md:hidden">{project.status}</div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                {project.status}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {project.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default ProjectsPage;
