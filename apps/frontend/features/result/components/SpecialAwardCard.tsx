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
import { SpecialAwardData } from "../types/main";

const SpecialAwardCard = ({ photoData }: { photoData: SpecialAwardData }) => {
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
        </div>
        <DialogContent className="max-h-screen w-full !max-w-none overflow-auto border-none bg-black text-white lg:w-[50vw]">
          <DialogTitle className="sr-only">
            {photoData.category.name}
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
          </div>
        </DialogContent>
        <div className="my-1 flex flex-col items-center justify-center">
          <div className="flex items-center">
            <Image
              src={`/images/metal-special.png`}
              alt={photoData.category.name}
              height={1000}
              width={1000}
              className="z-10 h-14 w-auto"
            />
            <p className="font-kiwimaru -ml-8 rounded-sm bg-[#D5643A] p-1 px-3 pl-10 text-center text-xl tracking-wider text-white">
              {photoData.category.name}
            </p>
          </div>
          <p className="font-kiwimaru text-center text-lg tracking-wider">
            {photoData.author.name}作品
          </p>
        </div>
      </div>
    </Dialog>
  );
};

export default SpecialAwardCard;
