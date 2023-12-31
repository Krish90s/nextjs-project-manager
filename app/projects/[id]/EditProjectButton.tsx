import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditProjectButton = ({ issueId }: { issueId: String }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/projects/${issueId}/edit`}>Edit Project</Link>
    </Button>
  );
};

export default EditProjectButton;
