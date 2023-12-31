"use client";
import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  issueId: string;
}

const DeleteProjectButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteButton = async () => {
    try {
      setIsSubmitting(true);
      await axios.delete(`/api/projects/${issueId}`);
      router.push("/projects");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occured.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isSubmitting}>
            <TrashIcon /> Delete Issue {isSubmitting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={() => handleDeleteButton()}>
                Yes, delete project
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteProjectButton;
