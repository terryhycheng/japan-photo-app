"use client";

import React from "react";
import FirstRoundCard from "./FirstRoundCard";
import { useQuery } from "@tanstack/react-query";
import { getRankingData } from "../data/ranking";

const FirstRoundList = () => {
  const {
    data: rankingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ranking"],
    queryFn: getRankingData,
  });

  if (isError) return <div>Error</div>;
  if (isLoading || !rankingData) return <div>Loading...</div>;

  return (
    <section className="pt-10">
      <div className="container mx-auto space-y-4">
        <div className="font-kiwimaru flex flex-col items-center gap-2 tracking-wider">
          <h2 className="text-4xl tracking-[0.5rem]">入圍作品</h2>
          <p>以下是被選入圍但未能進入排行榜之作品</p>
        </div>
        <div className="grid w-full gap-4 px-2 lg:grid-cols-3">
          {rankingData.length < 16 ? (
            <p className="font-kiwimaru my-6 rounded-md bg-white/20 p-4 text-center tracking-wider lg:col-span-3">
              無其他入圍作品
            </p>
          ) : (
            <>
              {rankingData.slice(15).map((photoData, index) => (
                <FirstRoundCard
                  key={photoData.photo.id}
                  photoData={photoData}
                  index={index}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FirstRoundList;
