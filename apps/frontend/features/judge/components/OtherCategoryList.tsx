"use client";

import CustomButton from "@/components/CustomButton";
import { Button } from "@repo/ui/components/button";
import {
  AwardIcon,
  EditIcon,
  FlagIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import React, { useState } from "react";
import { getAllCategories } from "../data/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "../types/main";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import CategoryForm from "./CategoryForm";
import {
  onCreateCategorySubmit,
  onDeleteCategorySubmit,
  onUpdateCategorySubmit,
} from "../data/forms";
import { toast } from "react-toastify";

const OtherCategoryList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  if (isCategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (isCategoriesError) {
    return <div>Error loading categories</div>;
  }

  if (!categories) {
    return <div>No categories found</div>;
  }

  return (
    <>
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-kiwimaru flex items-center gap-3 text-2xl font-bold tracking-wider">
            <FlagIcon className="size-8" /> 其他作品類別
          </h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <CustomButton
                text="新增類別"
                colour="var(--main-color)"
                isWhiteText
                icons={{ IconLeft: PlusIcon }}
              />
            </DialogTrigger>
            <DialogContent className="!max-w-2xl border-none">
              <CategoryForm
                title="新增類別"
                onSubmit={onCreateCategorySubmit}
                defaultValues={{
                  name: "",
                  description: "",
                  is_special: false,
                }}
                setIsOpen={setIsOpen}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white/40 p-4">
          <div className="flex justify-between gap-6">
            <p className="font-kiwimaru w-1/5 px-3">類別名稱</p>
            <p className="font-kiwimaru flex-1 px-3">簡介</p>
            <div className="flex w-1/5 items-center justify-end gap-3"></div>
            <div></div>
          </div>
          {categories
            .filter((category) => !category.is_special)
            .map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-kiwimaru flex items-center gap-3 text-2xl font-bold tracking-wider">
            <AwardIcon className="size-8" /> 特別大獎類別
          </h2>
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white/40 p-4">
          <div className="flex justify-between gap-6">
            <p className="font-kiwimaru w-1/5 px-3">類別名稱</p>
            <p className="font-kiwimaru flex-1 px-3">簡介</p>
            <div className="flex w-1/5 items-center justify-end gap-3"></div>
            <div></div>
          </div>
          {categories
            .filter((category) => category.is_special)
            .map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
        </div>
      </section>
    </>
  );
};

export default OtherCategoryList;

const CategoryCard = ({ category }: { category: Category }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { mutate: deleteCategory } = useMutation({
    mutationFn: () => onDeleteCategorySubmit(category.id),
    onSuccess: () => {
      toast.success("類別刪除成功");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("類別刪除失敗");
    },
  });

  return (
    <div className="flex justify-between gap-6 rounded-lg bg-white p-6">
      <h3 className="font-kiwimaru w-1/5 text-xl font-bold">{category.name}</h3>
      <p className="font-kiwimaru flex-1">{category.description}</p>
      <div className="flex w-1/5 items-center justify-end gap-3">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="bg-transparent">
              <EditIcon className="size-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="!max-w-2xl border-none">
            <CategoryForm
              title="編輯類別"
              onSubmit={(data) => onUpdateCategorySubmit(data, category.id)}
              defaultValues={{
                name: category.name,
                description: category.description,
                is_special: category.is_special,
              }}
              setIsOpen={setIsOpen}
            />
          </DialogContent>
        </Dialog>
        <Button
          variant="destructive"
          size="icon"
          className="bg-red-600"
          onClick={() => deleteCategory()}
        >
          <TrashIcon className="size-6" />
        </Button>
      </div>
    </div>
  );
};
