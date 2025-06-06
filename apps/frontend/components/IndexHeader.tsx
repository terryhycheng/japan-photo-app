"use client";

import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";

const IndexHeader = () => {
  const path = usePathname();

  return (
    <div className="border-main/10 flex items-center justify-between border-b bg-[#fbdecc] px-3 py-1 lg:p-4">
      <Link href="/">
        <div className="relative h-16 w-full max-w-xl">
          <Image
            src="/images/logo-horizontal.png"
            alt="logo"
            width={1000}
            height={200}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>
      <div
        className={cn("hidden items-center gap-6 lg:flex", {
          "lg:hidden": path === "/login",
        })}
      >
        <Link
          href="/login"
          className="font-kiwimaru text-xl tracking-wider underline"
        >
          評審登入
        </Link>
        <CustomButton
          href="/results"
          isDarkenText
          text="結果発表"
          colour="#86CBC4"
          icons={{ IconRight: ArrowRightIcon }}
        />
      </div>
    </div>
  );
};

export default IndexHeader;
