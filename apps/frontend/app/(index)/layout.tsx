import React from "react";
import IndexHeader from "@/components/IndexHeader";

const IndexLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex h-screen w-screen flex-col overflow-hidden">
      <IndexHeader />
      {children}
    </main>
  );
};

export default IndexLayout;
