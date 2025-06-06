import React from "react";

const Banner = ({ title }: { title: string }) => {
  return (
    <div className="bg-main font-dale flex items-center justify-center px-5 py-4 text-white">
      <span className="text-center text-4xl tracking-[0.5rem] lg:text-5xl">
        {title}
      </span>
    </div>
  );
};

export default Banner;
