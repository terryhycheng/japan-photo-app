import Banner from "@/components/Banner";
import JudgeMenu from "@/features/judge/components/JudgeMenu";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Banner title="評審評分系統" />
      <JudgeMenu />
      <main className="container mx-auto p-10">{children}</main>
    </>
  );
};

export default AdminLayout;
