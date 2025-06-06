"use client";

import React, { useState } from "react";
import { PhotoData } from "../types/main";
import JudgeCard from "./JudgeCard";
import { Loader2, RefreshCcwIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { clearPhotosCache } from "../data/photos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MainJudgeList = ({ selectedPhotos }: { selectedPhotos: PhotoData[] }) => {
  const queryClient = useQueryClient();
  const { mutate: clearCache, isPending } = useMutation({
    mutationFn: () =>
      clearPhotosCache({
        key: ["photos", "photos-selected"],
        queryClient,
      }),
  });
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="mb-10 space-y-10">
      <section>
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-2xl">
            <h2 className="font-kiwimaru font-bold tracking-wider">入圍作品</h2>
            <p className="font-kiwimaru tracking-wider">
              共{selectedPhotos.length}張相片
            </p>
          </div>
          <Button
            variant="outline"
            className="border-main hover:bg-main mr-2 border hover:text-white"
            size="icon"
            onClick={() => clearCache()}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <RefreshCcwIcon className="size-5" />
            )}
          </Button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          {selectedPhotos.length === 0 && (
            <p className="font-kiwimaru border-main col-span-3 rounded-lg border p-5 text-lg tracking-wider">
              尚無任何相片已入圍
            </p>
          )}
          {selectedPhotos.map((photo, index) => (
            <JudgeCard
              key={photo.id}
              originalPhotoData={photo}
              photoData={selectedPhotos[selectedPhoto || index] || photo}
              isSelectedPhoto
              setSelectedPhoto={setSelectedPhoto}
              index={index}
              arrayLength={selectedPhotos.length}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainJudgeList;
