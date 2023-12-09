import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const ProjectsPage = () => {
  return (
    <div>
      <Button>
        <Link href="/projects/new">New Project</Link>
      </Button>
    </div>
  );
};

export default ProjectsPage;
