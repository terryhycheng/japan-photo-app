import React from "react";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
  return (
    <div className="bg-photo p-4 lg:p-8">
      <Link href="/">
        <div className="relative h-14 lg:h-24">
          <Image
            src="/images/logo-vertical.png"
            alt="logo"
            width={1000}
            height={1000}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>
    </div>
  );
};

export default MainHeader;
