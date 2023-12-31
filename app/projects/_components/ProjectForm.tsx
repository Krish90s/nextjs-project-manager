"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { projectSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";
import { z } from "zod";

type ProjectFormData = z.infer<typeof projectSchema>;

interface Props {
  project?: Project;
}

const ProjectForm = ({ project }: { project?: Project }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<ProjectFormData> = async (body) => {
    try {
      setIsSubmitting(true);
      if (project) await axios.patch(`/api/projects/` + project.id, body);
      else await axios.post(`/api/projects`, body);

      router.push("/projects/list");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occured.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            defaultValue={project?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={project?.description}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        )}
        <Button disabled={isSubmitting}>
          {project ? "Update Project" : "Create Project"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
