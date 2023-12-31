import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  issueId: string;
}

const DeleteProjectButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button color="red">
      <TrashIcon /> Delete Issue
    </Button>
  );
};

export default DeleteProjectButton;
