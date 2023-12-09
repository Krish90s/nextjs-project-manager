"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProjectForm {
  title: string;
  description: string;
}

const NewProjectPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<ProjectForm> = async (body) => {
    try {
      const { data } = await axios.post("/api/projects", body);
      console.log(data);
      router.push("/projects");
    } catch (error) {}
  };

  return (
    <div className="max-w-xl">
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button type="submit">Create Project</Button>
      </form>
    </div>
  );
};

export default NewProjectPage;
