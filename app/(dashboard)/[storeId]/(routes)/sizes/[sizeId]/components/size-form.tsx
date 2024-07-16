"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: Size | null;
}

/**
 * This is a copy of settings-form. Super important how it works.
 * Revise again.
 *
 * Timestamp: 3:50:00
 *
 */
export default function SizeForm({ initialData }: SizeFormProps) {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit size details" : "Add a new size";
  const toastMessage = initialData
    ? "Size edited successfully."
    : "Size created successfully.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    console.log("Updated Name: ", data);
    try {
      setLoading(true);

      if (initialData) {
        // Chose to have a response. You can just do this as well:
        // await axios.patch(`/api/stores/${params.storeId}`, data);
        const response = await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data
        );
        console.log("Size-Form onSubmit: ", response);
      } else {
        const response = await axios.post(`/api/${params.storeId}/sizes`, data);
        console.log("Size-Form onSubmit: ", response);
      }

      router.refresh();
      router.push(`/${params.storeId}/sizes`);

      // This toast message is already checking if there is
      // an initialData.
      toast.success(toastMessage);
    } catch (error) {
      console.log("[SettingsForm-error]", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Size deleted successfully");
    } catch (error) {
      console.error("Size onDelete error: ", error);
      toast.error(
        "Make sure you removed all product before deleting this size."
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
