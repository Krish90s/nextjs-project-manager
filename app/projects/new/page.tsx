"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";

const NewProjectPage = () => {
  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Create Project</Button>
    </div>
  );
};

export default NewProjectPage;
