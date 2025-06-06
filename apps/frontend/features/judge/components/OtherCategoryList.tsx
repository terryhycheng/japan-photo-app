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
import React from "react";
import { getAllCategories } from "../data/categories";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../types/main";

const OtherCategoryList = () => {
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
          <CustomButton
            text="新增類別"
            colour="var(--main-color)"
            isWhiteText
            icons={{ IconLeft: PlusIcon }}
            onClick={() => {}}
          />
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white/40 p-4">
          <div className="flex justify-between gap-6">
            <p className="font-kiwimaru w-1/5 px-3">類別名稱</p>
            <p className="font-kiwimaru flex-1 px-3">簡介</p>
            <div className="flex w-1/5 items-center justify-end gap-3"></div>
            <div></div>
          </div>
          {categories
            .filter((category) => !category.special)
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
          <CustomButton
            text="新增類別"
            colour="var(--main-color)"
            isWhiteText
            icons={{ IconLeft: PlusIcon }}
            onClick={() => {}}
          />
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white/40 p-4">
          <div className="flex justify-between gap-6">
            <p className="font-kiwimaru w-1/5 px-3">類別名稱</p>
            <p className="font-kiwimaru flex-1 px-3">簡介</p>
            <div className="flex w-1/5 items-center justify-end gap-3"></div>
            <div></div>
          </div>
          {categories
            .filter((category) => category.special)
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
  return (
    <div className="flex justify-between gap-6 rounded-lg bg-white p-6">
      <h3 className="font-kiwimaru w-1/5 text-xl font-bold">
        {category.name}類
      </h3>
      <p className="font-kiwimaru flex-1">{category.description}</p>
      <div className="flex w-1/5 items-center justify-end gap-3">
        <Button variant="outline" size="icon" className="bg-transparent">
          <EditIcon className="size-6" />
        </Button>
        <Button variant="destructive" size="icon" className="bg-red-600">
          <TrashIcon className="size-6" />
        </Button>
      </div>
    </div>
  );
};
