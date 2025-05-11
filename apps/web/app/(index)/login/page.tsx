import CustomButton from "@/features/layout/components/Button";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

const LoginPage = () => {
  return (
    <main className="bg-photo relative flex flex-1 items-center justify-center">
      <div className="w-full max-w-xl rounded-xl bg-white/60 p-10">
        <h1 className="mb-10 text-center text-5xl tracking-[0.5rem]">
          評審登入
        </h1>
        <CustomButton
          href="/judge"
          text="登入"
          colour="var(--main-color)"
          icons={{ IconRight: ArrowRightIcon }}
          isWhiteText
        />
      </div>
    </main>
  );
};

export default LoginPage;
