"use client";

import CustomButton from "@/components/CustomButton";
import React, { useEffect, useState } from "react";
import SelectionCard from "./SelectionCard";
import {
  clearPhotosCache,
  getAllPhotos,
  getSelectedPhotos,
  updatePhotoSelection,
} from "../data/photos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { Button } from "@repo/ui/components/button";
import { RefreshCcwIcon } from "lucide-react";

const SelectionList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => await getAllPhotos(),
  });
  const { data: selectedPhotos, isLoading: isSelectedLoading } = useQuery({
    queryKey: ["photos-selected"],
    queryFn: async () => await getSelectedPhotos(),
  });
  const { mutate: updatePhotoSelectionMutation, isPending } = useMutation({
    mutationKey: ["updatePhotoSelection"],
    mutationFn: async (selection: string[]) => {
      await updatePhotoSelection(selection);
    },
    onSuccess: () => {
      clearPhotosCache({
        key: ["photos-selected"],
        redisKey: "photos-selected",
        queryClient,
      });
    },
  });

  const [selection, setSelection] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPhotos) {
      setSelection(selectedPhotos.map((photo) => photo._id));
    }
  }, [selectedPhotos]);

  if (isLoading || isSelectedLoading || !data || !selectedPhotos) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex gap-3 text-2xl">
          <h2 className="font-kiwimaru font-bold tracking-wider">
            選擇入圍作品
          </h2>
          <p className="font-kiwimaru tracking-wider">
            共{selection.length} / {data.length}張相片入圍
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-main hover:bg-main mr-2 border hover:text-white"
            size="icon"
            onClick={async () => {
              await clearPhotosCache({ key: ["photos"], queryClient });
            }}
          >
            <RefreshCcwIcon className="size-5" />
          </Button>
          <CustomButton
            onClick={() => {
              updatePhotoSelectionMutation(selection);
            }}
            text="更新名單"
            colour="var(--main-color)"
            className="font-bold"
            isWhiteText
            disabled={
              isPending ||
              _.isEqual(
                selectedPhotos.map((photo) => photo._id).sort(),
                selection.sort(),
              )
            }
          />
          <CustomButton
            text="取消"
            className="!border-main !text-main border-2 font-bold"
            colour="rgba(0,0,0,0)"
            onClick={() => {
              setSelection(selectedPhotos.map((photo) => photo._id));
            }}
          />
        </div>
      </section>
      <section className="mt-8 grid gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {data.map((item) => {
          return (
            <SelectionCard
              key={item._id}
              photoData={item}
              isSelected={selection.includes(item._id)}
              onSelect={() => {
                setSelection((prev) => {
                  return prev.includes(item._id)
                    ? prev.filter((photo) => photo !== item._id)
                    : [...prev, item._id];
                });
              }}
            />
          );
        })}
      </section>
    </>
  );
};

export default SelectionList;
