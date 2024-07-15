"use client";

import axios from "axios";
import { useState } from "react";
import { MoreHorizontal, Edit, ArrowLeft, Copy, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

import { CategoryColumn } from "./columns";

interface CellActionProps {
  data: CategoryColumn;
}

export function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category Id copied to clipboard");
  };

  // This onDelete function is a copy of the billboard-form.tsx onDelete function
  // The only difference is the /${data.id}
  // Timestamp: 5:04:00
  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);

      router.refresh();

      // We don't need any redirect here
      //router.push("/");
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("onDelete error: ", error);
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-8">
            <span className="sr-only">Open menu</span>
            <div>
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
