import MainHeader from "@/features/layout/components/MainHeader";
import React from "react";

const MainContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
};

export default MainContentLayout;
