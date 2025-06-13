"use client";

import CustomButton from "@/components/CustomButton";
import { ArrowLeftIcon, CircleHelpIcon, Loader } from "lucide-react";
import React from "react";
import OtherCard from "./OtherCard";
import { useQuery } from "@tanstack/react-query";
import { getOtherPhotos } from "../data/otherPhoto";

const OtherList = () => {
  const {
    data: otherPhotos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["other-photos"],
    queryFn: getOtherPhotos,
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading || !otherPhotos) return <Loader />;

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="font-kiwimaru flex flex-col items-center gap-4 tracking-wider">
          <h2 className="text-4xl tracking-[0.5rem]">其他作品</h2>
          <p>以下都是未被選入圍的作品，但被評審簡單歸類</p>
          <div className="w-full px-2">
            {Object.values(otherPhotos).map((category) => {
              return (
                <div key={category.details.name} className="my-8">
                  <div className="flex gap-2">
                    <CircleHelpIcon className="mt-1 size-8 flex-shrink-0" />
                    <div className="mb-5 space-y-2 tracking-[0.2rem]">
                      <h3 className="text-3xl">{category.details.name}</h3>
                      <p>{category.details.description || "No description"}</p>
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
                    {category.photos.map((photo) => (
                      <OtherCard key={photo.id} photoData={photo} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <CustomButton
            text="返回"
            colour="#86CBC4"
            href="/results"
            className="mt-10 w-fit !text-slate-700"
            isDarkenText
            icons={{
              IconLeft: ArrowLeftIcon,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default OtherList;
