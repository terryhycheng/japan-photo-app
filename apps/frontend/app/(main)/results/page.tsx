import React from "react";
import Banner from "@/components/Banner";
import { ResultChart } from "@/features/result/components/ResultChart";
import SpecialAwardList from "@/features/result/components/SpecialAwardList";
import RankingList from "@/features/result/components/RankingList";

const ResultPage = () => {
  return (
    <>
      <Banner title="結果発表" />
      <ResultChart />
      <RankingList />
      <SpecialAwardList />
    </>
  );
};

export default ResultPage;
