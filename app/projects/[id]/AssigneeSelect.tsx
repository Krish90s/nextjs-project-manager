"use client";
import { Select } from "@radix-ui/themes";
import { User } from "@prisma/client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="select assignee......." />
      <Select.Content>
        <Select.Group>
          {users?.map((user: User) => (
            <Select.Item key={user?.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
