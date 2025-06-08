import CustomButton from "@/components/CustomButton";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";

const OtherList = () => {
  return (
    <section className="pt-10">
      <div className="container mx-auto">
        <div className="font-kiwimaru flex flex-col items-center gap-4 tracking-wider">
          <h2 className="text-4xl tracking-[0.5rem]">其他作品</h2>
          <p>以下都是未被選入圍的作品，但被評審簡單歸類</p>
          <CustomButton
            text="返回"
            colour="#86CBC4"
            href="/results"
            className="mt-10 w-fit !text-slate-700"
            isDarkenText
            icons={{
              IconLeft: ArrowLeftIcon,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default OtherList;
