import { Category, PhotoData } from "@/features/judge/types/main";

export type RankingData = {
  photo: {
    id: string;
    total_score: number;
    scores: Record<string, number[]>;
    comment?: string;
    url: string;
  };
  author: {
    id: string;
    name: string;
  };
};

export type SpecialAwardData = {
  photo: {
    id: string;
    url: string;
  };
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
  };
};

export type ResultData = {
  result: Record<string, number>;
};

export type OtherPhoto = {
  details: {
    name: string;
    description: string;
  };
  photos: (Omit<PhotoData, "judge"> & {
    judge?: {
      category: Pick<Category, "name" | "description">;
      comment: string;
    };
  })[];
};
