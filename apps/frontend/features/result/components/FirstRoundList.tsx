import React from "react";

const FirstRoundList = () => {
  return (
    <section className="pt-10">
      <div className="container mx-auto">
        <div className="font-kiwimaru flex flex-col items-center gap-4 tracking-wider">
          <h2 className="text-4xl tracking-[0.5rem]">入圍作品</h2>
          <p>以下是被選入圍但未能進入排行榜之作品</p>
        </div>
      </div>
    </section>
  );
};

export default FirstRoundList;
