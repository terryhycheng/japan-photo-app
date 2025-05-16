"use client";

import React from "react";
import type { PhotoData } from "../types/main";
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

const SelectionCard = ({
  photoData,
  isSelected,
  onSelect,
}: {
  photoData: PhotoData;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <Dialog>
      <div className="font-kiwimaru relative h-72 w-full overflow-hidden rounded-lg">
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-lg border-3 border-transparent",
            {
              "border-red-500": isSelected,
            },
          )}
          onClick={() => {
            onSelect();
          }}
        >
          <Image
            src={photoData.url}
            alt={photoData.original_filename}
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
      <DialogContent className="h-[80vh] w-full !max-w-none border-none bg-black text-white lg:h-[70vh] lg:w-[50vw]">
        <DialogTitle className="sr-only">
          {photoData.original_filename}
        </DialogTitle>
        <div className="relative h-full w-full">
          <Image
            src={photoData.url}
            alt={photoData.original_filename}
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectionCard;
