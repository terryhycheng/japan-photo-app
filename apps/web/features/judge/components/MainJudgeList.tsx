"use client";

import React from "react";
import { PhotoData } from "../types/main";
import JudgeCard from "./JudgeCard";
import { RefreshCcwIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { clearPhotosCache } from "../data/photos";
import { useQueryClient } from "@tanstack/react-query";

const MainJudgeList = ({ selectedPhotos }: { selectedPhotos: PhotoData[] }) => {
  const queryClient = useQueryClient();
  const photosYetToBeJudged = selectedPhotos.filter((photo) => !photo?.judge);
  const photosJudged = selectedPhotos.filter((photo) => photo?.judge);

  return (
    <div className="mb-10 space-y-10">
      <section>
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-2xl">
            <h2 className="font-kiwimaru font-bold tracking-wider">待評審</h2>
            <p className="font-kiwimaru tracking-wider">
              共{selectedPhotos.length}張相片
            </p>
          </div>
          <Button
            variant="outline"
            className="border-main hover:bg-main mr-2 border hover:text-white"
            size="icon"
            onClick={async () => {
              await clearPhotosCache({ key: "photos", queryClient });
            }}
          >
            <RefreshCcwIcon className="size-5" />
          </Button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          {photosYetToBeJudged.length === 0 && (
            <p className="font-kiwimaru border-main col-span-3 rounded-lg border p-5 text-lg tracking-wider">
              全部入圍相片已被評審
            </p>
          )}
          {photosYetToBeJudged.map((photo) => (
            <JudgeCard key={photo.id} photoData={photo} isSelectedPhoto />
          ))}
        </div>
      </section>
      <section>
        <div className="flex gap-3 text-2xl">
          <h2 className="font-kiwimaru font-bold tracking-wider">已評審</h2>
          <p className="font-kiwimaru tracking-wider">
            共{photosJudged.length}張相片
          </p>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          {photosJudged.length === 0 && (
            <p className="font-kiwimaru border-main col-span-3 rounded-lg border p-5 text-lg tracking-wider">
              尚無任何相片已被評審
            </p>
          )}
          {photosJudged.map((photo) => (
            <JudgeCard key={photo.id} photoData={photo} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainJudgeList;
