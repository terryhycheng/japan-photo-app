"use client";

import React, { useState } from "react";
import { PhotoData } from "../types/main";
import JudgeCard from "./JudgeCard";

const OtherJudgeList = ({ otherPhotos }: { otherPhotos: PhotoData[] }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="mb-10 space-y-10">
      <section>
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-2xl">
            <h2 className="font-kiwimaru font-bold tracking-wider">其他作品</h2>
            <p className="font-kiwimaru tracking-wider">
              共{otherPhotos.length}張相片
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          {otherPhotos.length === 0 && (
            <p className="font-kiwimaru border-main col-span-3 rounded-lg border p-5 text-lg tracking-wider">
              尚無任何相片待評審
            </p>
          )}
          {otherPhotos.map((photo, index) => (
            <JudgeCard
              key={photo.id}
              originalPhotoData={photo}
              photoData={otherPhotos[selectedPhoto || index] || photo}
              setSelectedPhoto={setSelectedPhoto}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default OtherJudgeList;
