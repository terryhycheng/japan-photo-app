import { RankingData } from "../types/main";

export const getRankingData = async (): Promise<RankingData[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/judge/ranking`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return await response.json();
};
