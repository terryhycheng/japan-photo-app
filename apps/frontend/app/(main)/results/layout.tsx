import Footer from "@/features/result/components/Footer";
import React, { PropsWithChildren } from "react";

const ResultLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex min-h-[85vh] flex-col">
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default ResultLayout;
