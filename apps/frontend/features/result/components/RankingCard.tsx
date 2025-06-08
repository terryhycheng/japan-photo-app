"use client";

import React from "react";
import Image from "next/image";
import { ExpandIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { cn } from "@repo/ui/lib/utils";
import { RankingData } from "../types/main";
import { criterias } from "@/features/judge/components/JudgeFormMain";

const RankingCard = ({
  photoData,
  index,
}: {
  photoData: RankingData;
  index: number;
}) => {
  const totalScoreNotScaled = Object.values(photoData.photo.scores).reduce(
    (acc, curr) => acc + Number(curr),
    0,
  );

  return (
    <Dialog>
      <div>
        <div className="font-kiwimaru relative h-72 w-full overflow-hidden rounded-lg">
          <div
            className={cn(
              "relative h-full w-full overflow-hidden rounded-lg border-3 border-transparent",
            )}
          >
            <Image
              src={photoData.photo.url}
              alt={photoData.photo.id}
              height={1000}
              width={1000}
              loading="lazy"
              className="-z-10 h-full w-full object-cover"
            />
          </div>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 left-4 z-10 border-none bg-black/50 text-white"
            >
              <ExpandIcon className="size-6" />
            </Button>
          </DialogTrigger>
          {index < 3 && (
            <Image
              src={`/images/metal-${index + 1}.png`}
              alt={`metal-${index + 1}`}
              height={1000}
              width={1000}
              className="absolute right-2 bottom-2 z-10 h-20 w-auto"
            />
          )}
        </div>
        <DialogContent className="bg-background max-h-screen w-full !max-w-none overflow-auto border-none lg:w-[50vw]">
          <DialogTitle className="font-dale mx-auto flex items-center gap-2 text-center text-2xl font-normal tracking-wider">
            {index < 3 && (
              <Image
                src={`/images/metal-${index + 1}.png`}
                alt={`metal-${index + 1}`}
                height={1000}
                width={1000}
                className="h-10 w-auto"
              />
            )}
            第{index + 1}名
          </DialogTitle>
          <div className="flex flex-col gap-4">
            <div className="relative h-[300px] w-full lg:h-[500px]">
              <Image
                src={photoData.photo.url}
                alt={photoData.photo.id}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-kiwimaru grid grid-cols-2 justify-center gap-2 rounded-lg bg-white/40 p-4 font-bold">
                <p>
                  分數：
                  <span className="font-normal">
                    {photoData.photo.total_score} / 100
                  </span>
                </p>
                <p>
                  攝影師：
                  <span className="font-normal">{photoData.author.name}</span>
                </p>
                <div className="col-span-2 flex gap-2">
                  <p className="w-fit">評語：</p>
                  <p className="flex-1 font-normal">
                    {photoData.photo.comment || "無評語"}
                  </p>
                </div>
              </div>
              <div className="font-kiwimaru grid grid-cols-2 justify-center gap-2 rounded-lg bg-white/40 p-4 font-bold lg:grid-cols-3">
                {Object.entries(photoData.photo.scores).map(([key, value]) => (
                  <p key={key}>
                    {key}：
                    <span className="font-normal">
                      {value} /{" "}
                      {criterias.find((criteria) => criteria.name === key)?.max}
                    </span>
                  </p>
                ))}
                <hr className="col-span-2 my-2 lg:col-span-3" />
                <p className="col-span-2 lg:col-span-3">
                  未百分比化總分：
                  <span className="font-normal">
                    {totalScoreNotScaled} / 130
                  </span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
        <p className="font-dale text-center text-2xl">第{index + 1}名</p>
        <p className="font-kiwimaru text-center text-xl tracking-wide">
          <span>{photoData.photo.total_score}</span> 分 -{" "}
          {photoData.author.name}作品
        </p>
      </div>
    </Dialog>
  );
};

export default RankingCard;
