"use cleint";

import React from "react";
import { PhotoData } from "../types/main";

const OtherJudgeList = ({ otherPhotos }: { otherPhotos: PhotoData[] }) => {
  return (
    <section>
      <div className="flex gap-3 text-2xl">
        <h2 className="font-kiwimaru font-bold tracking-wider">其他作品</h2>
        <p className="font-kiwimaru tracking-wider">共55張相片</p>
      </div>
    </section>
  );
};

export default OtherJudgeList;
