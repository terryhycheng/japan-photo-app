import { ResultData } from "../types/main";

export const getResult = async (): Promise<ResultData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/judge/result`,
  );

  if (!res.ok) {
    throw new Error(`Failed to get result: ${await res.text()}`);
  }
  const data = await res.json();
  return data;
};
