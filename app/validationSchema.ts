import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const memberSchema = z.object({
  userId: z.string().min(1, "User id is required").max(255),
  projectId: z.string().min(1, "Project id is required").max(255),
});
