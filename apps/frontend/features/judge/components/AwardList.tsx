"use client";

import React, { useMemo, useState } from "react";
import { Category, PhotoData } from "../types/main";
import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import { PlusIcon, RefreshCcwIcon, SaveIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { isEqual } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onAssignAwardSubmit } from "../data/forms";

const AWARD_KEYS = [
  "best_angle",
  "best_creativtiy",
  "best_cultral_value",
] as const;

const AwardForm = z.object({
  best_angle: z.object({
    categoryId: z.string(),
    awardPhoto: z.string().optional(),
  }),
  best_creativtiy: z.object({
    categoryId: z.string(),
    awardPhoto: z.string().optional(),
  }),
  best_cultral_value: z.object({
    categoryId: z.string(),
    awardPhoto: z.string().optional(),
  }),
});

type AwardFormType = z.infer<typeof AwardForm>;

const AwardList = ({
  photos,
  categories,
}: {
  photos: PhotoData[];
  categories: Category[];
}) => {
  const queryClient = useQueryClient();

  const { mutate: assignAward, isPending } = useMutation({
    mutationKey: ["assignAward"],
    mutationFn: ({
      awards,
    }: {
      awards: { categoryId: string; photoId: string | undefined }[];
    }) => {
      return onAssignAwardSubmit({ awards });
    },
    onSuccess: () => {
      toast.success("更新特別大獎成功");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(`更新特別大獎失敗: ${error.message}`);
    },
  });

  const defaultValues: AwardFormType = useMemo(() => {
    const bestAngle = categories.find((category) =>
      category.name.includes("最佳角度"),
    );
    const bestCreativity = categories.find((category) =>
      category.name.includes("最具創意"),
    );
    const bestCulturalValue = categories.find((category) =>
      category.name.includes("最具文化特色"),
    );

    return {
      best_angle: {
        categoryId: bestAngle?.id || "",
        awardPhoto: bestAngle?.awardPhoto,
      },
      best_creativtiy: {
        categoryId: bestCreativity?.id || "",
        awardPhoto: bestCreativity?.awardPhoto,
      },
      best_cultral_value: {
        categoryId: bestCulturalValue?.id || "",
        awardPhoto: bestCulturalValue?.awardPhoto,
      },
    } satisfies AwardFormType;
  }, [categories]);

  const form = useForm<AwardFormType>({
    resolver: zodResolver(AwardForm),
    defaultValues,
  });

  const values = form.watch();
  const isUnchanged = useMemo(
    () => isEqual(values, defaultValues),
    [values, defaultValues],
  );

  const handleSubmit = (data: AwardFormType) => {
    const awardArray: { categoryId: string; photoId: string | undefined }[] =
      [];

    Object.entries(data).forEach(([_, value]) => {
      awardArray.push({
        categoryId: value.categoryId,
        photoId: value.awardPhoto,
      });
    });

    assignAward({ awards: awardArray });
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between">
        <h2 className="font-kiwimaru text-2xl font-bold tracking-wider">
          特別獎項
        </h2>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CustomButton
            text="更新大獎名單"
            icons={{ IconLeft: SaveIcon }}
            colour="var(--main-color)"
            disabled={isPending || isUnchanged}
            isWhiteText={false}
            className="!border-main !text-main border !bg-transparent"
          />
        </form>
      </div>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AWARD_KEYS.map((key) => (
          <AwardCard
            key={key}
            photos={photos}
            form={form}
            awardKey={key}
            categoryId={values[key].categoryId}
          />
        ))}
      </div>
    </section>
  );
};

export default AwardList;

const AwardCard = ({
  photos,
  form,
  awardKey,
  categoryId,
}: {
  photos: PhotoData[];
  form: UseFormReturn<AwardFormType>;
  awardKey: (typeof AWARD_KEYS)[number];
  categoryId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  let awardName: string = "";

  const awardValue = form.watch(awardKey);
  const photo = photos.find((photo) => photo.id === awardValue.awardPhoto);

  const isAwarded = awardValue !== undefined && photo;

  switch (awardKey) {
    case "best_angle":
      awardName = "最佳角度";
      break;
    case "best_creativtiy":
      awardName = "最具創意";
      break;
    case "best_cultral_value":
      awardName = "最具文化特色";
      break;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="overflow-hidden rounded-lg">
        <h3 className="bg-main p-4 text-center text-2xl tracking-[0.3rem] text-white">
          {awardName}大獎
        </h3>

        <div className="relative h-[20vh] w-full bg-white/20">
          {isAwarded && (
            <Image
              src={photo.url}
              alt="award"
              className="object-cover"
              fill
              sizes="100%"
            />
          )}
          <div className="absolute right-1/2 bottom-6 translate-x-1/2">
            {isAwarded ? (
              <div className="flex w-[400px] items-center justify-center gap-2">
                <DialogTrigger asChild>
                  <CustomButton
                    text="更變相片"
                    icons={{ IconLeft: RefreshCcwIcon }}
                    isWhiteText
                  />
                </DialogTrigger>
                <CustomButton
                  icons={{ IconLeft: TrashIcon }}
                  isWhiteText
                  colour="oklch(0.505 0.213 27.518)"
                  onClick={() => {
                    form.setValue(awardKey, {
                      categoryId,
                      awardPhoto: undefined,
                    });
                  }}
                />
              </div>
            ) : (
              <DialogTrigger asChild>
                <CustomButton
                  text="選擇相片"
                  icons={{ IconLeft: PlusIcon }}
                  isWhiteText={false}
                  colour="#840F0F"
                  className="!border-main !text-main border !bg-transparent"
                />
              </DialogTrigger>
            )}
          </div>
        </div>
      </div>
      <DialogContent className="max-h-[80vh] !max-w-4xl overflow-y-auto border-none">
        <DialogHeader>
          <DialogTitle className="text-4xl font-normal tracking-[0.3rem]">
            揀選{awardName}大獎
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo) => (
            <Button
              variant="ghost"
              asChild
              key={photo.id}
              disabled={true}
              onClick={() => {
                if (awardValue.awardPhoto !== photo.id) {
                  form.setValue(awardKey, {
                    categoryId,
                    awardPhoto: photo.id,
                  });
                  setIsOpen(false);
                }
              }}
            >
              <div
                className={cn(
                  "relative h-40 overflow-hidden rounded-sm bg-white/20",
                  {
                    "animate-pulse !cursor-not-allowed border-3 border-red-700":
                      awardValue.awardPhoto === photo.id,
                  },
                )}
              >
                <Image
                  src={photo.url}
                  alt="photo"
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
