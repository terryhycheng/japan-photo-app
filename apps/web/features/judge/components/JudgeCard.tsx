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

const JudgeCard = ({
  photoData,
  isSelectedPhoto = false,
}: {
  photoData: PhotoData;
  isSelectedPhoto?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="font-kiwimaru relative h-72 w-full overflow-hidden rounded-lg">
        <DialogTrigger asChild>
          <div className="relative h-full w-full cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-red-500">
            <Image
              src={photoData.url}
              alt={photoData.original_filename}
              height={1000}
              width={1000}
              loading="lazy"
              className="-z-10 h-full w-full object-cover"
            />
          </div>
        </DialogTrigger>
      </div>
      <DialogContent className="w-full !max-w-none overflow-hidden border-none p-0 text-white lg:w-[70vw]">
        <DialogTitle className="sr-only">
          {photoData.original_filename}
        </DialogTitle>
        <div className="flex h-full w-full">
          <div className="flex-1 bg-black py-5">
            <div className="relative h-full w-full">
              <Image
                src={photoData.url}
                alt={photoData.original_filename}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-main w-full p-6 text-3xl tracking-wider">
              評分表
            </div>
            <div className="p-8">
              <JudgeFormMain photoId={photoData.id} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JudgeCard;
