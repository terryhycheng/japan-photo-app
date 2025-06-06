import { PhotoData } from "../types/main";

export const getAllPhotos = async (): Promise<PhotoData[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/photos`);

  if (!res.ok) {
    throw new Error(`Failed to get all photos: ${await res.text()}`);
  }
  const data = await res.json();
  return data;
};

export const getPhotoById = async (photoId: string): Promise<PhotoData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/photos/${photoId}`,
  );
  if (!res.ok) {
    throw new Error(`Failed to get photo by id: ${await res.text()}`);
  }
  const data = await res.json();

  return data;
};

export const updatePhotoSelection = async (photosIds: string[]) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/photos/selection`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photosIds),
    },
  );
  if (!res.ok) {
    throw new Error(`Failed to update photo selection: ${await res.text()}`);
  }
};
export const getSelectedPhotos = async (): Promise<PhotoData[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/photos/selected`,
  );
  if (!res.ok) {
    throw new Error(`Failed to get selected photos: ${await res.text()}`);
  }
  const data = await res.json();
  return data;
};
