import React, { useEffect } from "react";
import { Textarea } from "@repo/ui/components/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/form";
import { z } from "zod";
import { SaveIcon } from "lucide-react";
import CustomButton from "@/components/CustomButton";
import { onJudgeFormOtherSubmit } from "../data/forms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clearPhotosCache, getPhotoById } from "../data/photos";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { getAllCategories } from "../data/categories";

const JudgeFormOthersSchema = z.object({
  categoryId: z.string(),
  comment: z.string(),
});
export type JudgeFormOthersSchema = z.infer<typeof JudgeFormOthersSchema>;

const JudgeFormOthers = ({ photoId }: { photoId: string }) => {
  const queryClient = useQueryClient();

  const {
    data: photo,
    isLoading: isPhotoLoading,
    isError: isPhotoError,
  } = useQuery({
    queryKey: ["photos", photoId],
    queryFn: () => getPhotoById(photoId),
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const allCategories = await getAllCategories();
      return allCategories.filter((category) => !category.special);
    },
  });

  const { mutate: updatePhoto, isPending } = useMutation({
    mutationKey: ["updatePhoto"],
    mutationFn: (data: { data: JudgeFormOthersSchema; photoId: string }) =>
      onJudgeFormOtherSubmit(data),
    onSuccess: () => {
      clearPhotosCache({ key: [["photos", photoId], "photos"], queryClient });
      toast.success("評分已更新");
    },
    onError: (error) => {
      console.error(error);
      toast.error("評分更新失敗");
    },
  });

  const form = useForm<z.infer<typeof JudgeFormOthersSchema>>({
    defaultValues: {
      categoryId: "",
      comment: "",
    },
  });

  useEffect(() => {
    if (photo && categories) {
      form.reset({
        categoryId: photo.judge?.categoryId || "",
        comment: photo.judge?.comment || "",
      });
    }
  }, [photo, categories]);

  const onSubmit = (data: z.infer<typeof JudgeFormOthersSchema>) => {
    updatePhoto({ data, photoId });
  };

  if (isPhotoError || isCategoriesError) {
    return <div className="text-main">Error</div>;
  }

  if (isPhotoLoading || isCategoriesLoading) {
    return <div className="text-main">Loading...</div>;
  }

  if (!photo || !categories) {
    return <div className="text-main">No photo or categories data</div>;
  }

  return (
    <Form {...form}>
      <form className="text-main" onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className="text-main text-3xl">評分類別</h3>
        <div className="mt-4 mb-6 space-y-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => {
              return (
                <FormItem>
                  <Select
                    onValueChange={(value) => value && field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="請選擇分類" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <h3 className="text-main text-3xl">評語</h3>
        <div className="mt-4">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="font-kiwimaru text-main h-48 flex-1 border-transparent bg-white/20"
                    placeholder="請在此輸入評語"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 flex justify-end">
          <CustomButton
            isWhiteText
            text="更新評分"
            disabled={isPending || !form.formState.isDirty}
            colour="var(--main-color)"
            icons={{ IconLeft: SaveIcon }}
          />
        </div>
      </form>
    </Form>
  );
};

export default JudgeFormOthers;
