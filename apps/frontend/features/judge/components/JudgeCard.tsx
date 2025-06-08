"use client";

import React, { useState } from "react";
import type { PhotoData } from "../types/main";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import JudgeFormMain from "./JudgeFormMain";
import { cn } from "@repo/ui/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from "lucide-react";
import JudgeFormOther from "./JudgeFormOther";
import { Button } from "@repo/ui/components/button";

const JudgeCard = ({
  originalPhotoData,
  photoData,
  isSelectedPhoto = false,
  index,
  setSelectedPhoto,
}: {
  originalPhotoData: PhotoData;
  photoData: PhotoData;
  isSelectedPhoto?: boolean;
  index: number;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isJudged = !!originalPhotoData.judge;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedPhoto(null);
        }
        setIsOpen(open);
      }}
    >
      <div className="font-kiwimaru relative h-72 w-full overflow-hidden rounded-lg">
        <DialogTrigger asChild>
          <div className="bg- relative h-full w-full cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-red-500">
            {isJudged && (
              <div className="absolute top-1/2 right-1/2 z-10 translate-x-[40%] -translate-y-1/2 rounded-full bg-white/50 p-2 text-white">
                <CheckCircleIcon className="size-14 text-green-600" />
              </div>
            )}
            <Image
              src={originalPhotoData.url}
              alt={originalPhotoData.original_filename}
              height={1000}
              width={1000}
              loading="lazy"
              className={cn("-z-10 h-full w-full object-cover", {
                "opacity-50": isJudged,
              })}
            />
          </div>
        </DialogTrigger>
      </div>
      <DialogContent className="max-h-screen w-full !max-w-none overflow-auto border-none p-0 text-white lg:w-[70vw]">
        <DialogTitle className="sr-only">
          {photoData.original_filename}
        </DialogTitle>
        <div className="flex h-full min-h-[800px] w-full">
          <div className="flex-1 bg-black py-5">
            <div className="relative h-full w-full">
              <Button
                asChild
                onClick={() => setSelectedPhoto((i) => (i ?? index) - 1)}
                className="absolute top-1/2 left-5 z-10 size-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ArrowLeftIcon className="size-10" />
              </Button>
              <Image
                src={photoData.url}
                alt={photoData.original_filename}
                fill
                className="h-full w-full object-contain"
              />
              <Button
                asChild
                onClick={() => setSelectedPhoto((i) => (i ?? index) + 1)}
                className="absolute top-1/2 right-5 z-10 size-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ArrowRightIcon className="size-10" />
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-main w-full p-6 text-3xl tracking-wider">
              評分表
            </div>
            <div className="p-8">
              {isSelectedPhoto ? (
                <JudgeFormMain
                  photoId={photoData?.id ?? originalPhotoData.id}
                />
              ) : (
                <JudgeFormOther
                  photoId={photoData?.id ?? originalPhotoData.id}
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JudgeCard;
