"use client";

import Loader from "@/components/Loader";
import AwardList from "@/features/judge/components/AwardList";
import MainJudgeList from "@/features/judge/components/MainJudgeList";
import OtherJudgeList from "@/features/judge/components/OtherJudgeList";
import { getAllCategories } from "@/features/judge/data/categories";
import { getAllPhotos } from "@/features/judge/data/photos";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const FinalRoundClientPage = () => {
  const { data: photos, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => getAllPhotos(),
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  if (isLoading || !photos || isCategoriesLoading || !categories) {
    return <Loader />;
  }

  const selectedPhotos = photos.filter((photo) => photo?.is_selected);
  const otherPhotos = photos.filter((photo) => !photo?.is_selected);

  return (
    <>
      <AwardList
        photos={photos}
        categories={categories.filter((category) => category.is_special)}
      />
      <MainJudgeList selectedPhotos={selectedPhotos} />
      <OtherJudgeList otherPhotos={otherPhotos} />
    </>
  );
};

export default FinalRoundClientPage;
