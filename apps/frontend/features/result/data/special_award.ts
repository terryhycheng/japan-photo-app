import { SpecialAwardData } from "../types/main";

export const getSpecialAwards = async (): Promise<SpecialAwardData[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/judge/special-awards`,
  );
  const data = await res.json();
  return data;
};
