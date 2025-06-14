"use client";

import React from "react";
import RankingCard from "./RankingCard";
import { useQuery } from "@tanstack/react-query";
import { getRankingData } from "../data/ranking";
import Loader from "@/components/Loader";

const RankingList = () => {
  const {
    data: rankingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ranking"],
    queryFn: getRankingData,
  });

  if (isError) return <div>Error</div>;
  if (isLoading || !rankingData) return <Loader />;

  return (
    <section className="bg-[#F8D6C1] py-10">
      <div className="container mx-auto flex flex-col items-center gap-8">
        <div className="font-kiwimaru flex flex-col items-center gap-4 tracking-wider">
          <h2 className="text-4xl">作品排行榜</h2>
          <p>點擊相片以觀看個別評價以及評分細節</p>
        </div>
        <div className="grid w-full gap-4 px-2 lg:grid-cols-3">
          {rankingData.slice(0, 15).map((data, index) => (
            <RankingCard key={data.photo.id} photoData={data} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RankingList;
