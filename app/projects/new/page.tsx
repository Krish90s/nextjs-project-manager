"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewProjectPage = () => {
  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Create Project</Button>
    </div>
  );
};

export default NewProjectPage;
