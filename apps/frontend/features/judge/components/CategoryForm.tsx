"use client";

import CustomButton from "@/components/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { DialogHeader, DialogTitle } from "@repo/ui/components/dialog";
import { Switch } from "@repo/ui/components/switch";

const categoryFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  is_special: z.boolean().default(false),
});
export type CategoryFormSchemaType = z.infer<typeof categoryFormSchema>;

const CategoryForm = ({
  title = "新增類別",
  defaultValues,
  onSubmit,
  setIsOpen,
}: {
  title?: string;
  defaultValues?: CategoryFormSchemaType;
  onSubmit: (data: CategoryFormSchemaType) => Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  const { mutate: createCategory } = useMutation({
    mutationFn: (data: CategoryFormSchemaType) => {
      return onSubmit(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("類別更新成功");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("類別更新失敗");
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-normal">{title}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => createCategory(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>類別名稱</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="請輸入類別名稱" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>類別簡介</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-y border-none bg-white/40"
                    placeholder="請輸入類別簡介"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_special"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>是否為特殊類別？</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <CustomButton
              text="提交"
              disabled={!form.formState.isDirty}
              colour="var(--main-color)"
              isWhiteText
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
