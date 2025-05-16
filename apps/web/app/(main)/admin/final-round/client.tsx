"use client";

import MainJudgeList from "@/features/judge/components/MainJudgeList";
import OtherJudgeList from "@/features/judge/components/OtherJudgeList";
import { getAllPhotos } from "@/features/judge/data/photos";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const FinalRoundClientPage = () => {
  const { data: photos, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => getAllPhotos(),
  });

  if (isLoading || !photos) {
    return <div>Loading...</div>;
  }

  const selectedPhotos = photos.filter((photo) => photo?.selected);
  const otherPhotos = photos.filter((photo) => !photo?.selected);

  return (
    <>
      <MainJudgeList selectedPhotos={selectedPhotos} />
      <OtherJudgeList otherPhotos={otherPhotos} />
    </>
  );
};

export default FinalRoundClientPage;
