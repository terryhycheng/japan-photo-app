"use client";

import CustomButton from "@/components/CustomButton";
import { Button } from "@repo/ui/components/button";
import { EditIcon, FlagIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";

const fakeCategoryList = [
  {
    name: "無從判斷",
    description: "未能判斷主題及其意義，純粹是浪費地球資源的相片",
  },
  {
    name: "手指入鏡",
    description: "評審已千叮萬囑不要放手指入鏡頭，可以自我檢討一下的相片",
  },
  {
    name: "光線不足",
    description:
      "一般傻瓜機IOS都是大約400，通常只適合晴天戶外的環境。室內的環境最好要使用閃光燈，請下次記緊。此類只是由於經驗不足或是想拍實驗性質的相片，是菲林相機一定有的情況，所以不是甚麼十惡不赦的大罪。",
  },
];

const OtherCategoryList = () => {
  return (
    <>
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
        {fakeCategoryList.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </>
  );
};

export default OtherCategoryList;

const CategoryCard = ({
  category,
}: {
  category: (typeof fakeCategoryList)[number];
}) => {
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
