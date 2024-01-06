"use client";
import { Select } from "@radix-ui/themes";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  console.log("users", users);

  return (
    <Select.Root>
      <Select.Trigger placeholder="select assignee......." />
      <Select.Content>
        <Select.Group>
          {users.map((user: User) => (
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
