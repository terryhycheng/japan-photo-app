import type { OtherPhoto } from "../types/main";

export const getOtherPhotos = async (): Promise<OtherPhoto[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/judge/other-photo-result`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.result;
};
