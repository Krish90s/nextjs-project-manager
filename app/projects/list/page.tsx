import { Table } from "@radix-ui/themes";
import React from "react";
import prisma from "@/prisma/client";
import { StatusBadge, Link } from "@/app/components";
import IssueActions from "./issueActions";

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany();

  return (
    <div>
      <IssueActions />
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
                <Link href={`/projects/${project.id}`}>{project.title}</Link>
                <div className="block md:hidden">
                  <StatusBadge status={project.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={project.status} />
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

export const dynamic = "force-dynamic";

export default ProjectsPage;
