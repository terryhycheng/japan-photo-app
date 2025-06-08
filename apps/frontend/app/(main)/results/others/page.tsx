import Banner from "@/components/Banner";
import OtherList from "@/features/result/components/OtherList";
import FirstRoundList from "@/features/result/components/FirstRoundList";
import React from "react";

const ResultOtherPage = () => {
  return (
    <>
      <Banner title="其他作品" />
      <FirstRoundList />
      <OtherList />
    </>
  );
};

export default ResultOtherPage;
