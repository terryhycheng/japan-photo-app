"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { cn } from "@repo/ui/lib/utils";
import { OtherPhoto } from "../types/main";

const OtherCard = ({ photoData }: { photoData: OtherPhoto["photos"][0] }) => {
  return (
    <Dialog>
      <div>
        <div className="font-kiwimaru relative h-50 w-full overflow-hidden rounded-lg">
          <DialogTrigger asChild>
            <div
              className={cn(
                "relative h-full w-full cursor-pointer overflow-hidden rounded-lg border-3 border-transparent",
              )}
            >
              <Image
                src={photoData.url}
                alt={photoData.id}
                height={1000}
                width={1000}
                loading="lazy"
                className="-z-10 h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
          </DialogTrigger>
        </div>
        <DialogContent className="bg-background max-h-screen w-full !max-w-none overflow-auto border-none lg:w-[50vw]">
          <DialogTitle className="font-dale mx-auto flex items-center gap-2 text-center text-2xl font-normal tracking-wider"></DialogTitle>
          <div className="flex flex-col gap-4">
            <div className="relative h-[300px] w-full lg:h-[500px]">
              <Image
                src={photoData.url}
                alt={photoData.id}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-kiwimaru flex flex-col gap-2 rounded-lg bg-white/40 p-4 font-bold">
                <p>
                  攝影師：
                  <span className="font-normal">{photoData.author.name}</span>
                </p>
                <div className="col-span-2 flex gap-2">
                  <p className="w-fit">評語：</p>
                  <p className="flex-1 font-normal">
                    {photoData.judge?.comment || "無評語"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default OtherCard;
