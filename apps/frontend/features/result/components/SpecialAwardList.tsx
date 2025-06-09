"use client";

import CustomButton from "@/components/CustomButton";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import SpecialAwardCard from "./SpecialAwardCard";
import { useQuery } from "@tanstack/react-query";
import { getSpecialAwards } from "../data/special_award";

const SpecialAwardList = () => {
  const {
    data: specialAwards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["specialAwards"],
    queryFn: async () => await getSpecialAwards(),
  });

  if (isError) return <div>Error</div>;

  if (isLoading || !specialAwards) return <div>Loading...</div>;

  return (
    <section className="container mx-auto flex flex-col items-center gap-8 py-10">
      <div className="font-kiwimaru flex flex-col items-center gap-4 tracking-wider">
        <h2 className="text-4xl">特別獎項</h2>
        <p>由評審選出三名最具特色的相片以作鼓勵</p>
      </div>
      <div className="grid w-full gap-4 px-2 lg:grid-cols-3">
        {specialAwards.map((data) => (
          <SpecialAwardCard key={data.photo.id} photoData={data} />
        ))}
      </div>
      <CustomButton
        text="觀看其餘作品"
        colour="#86CBC4"
        href="/results/others"
        className="mt-6 !text-slate-700"
        isDarkenText
        icons={{
          IconRight: ArrowRightIcon,
        }}
      />
    </section>
  );
};

export default SpecialAwardList;
