import { type QueryClient } from "@tanstack/react-query";
import { PhotoData } from "../types/main";

export const getAllPhotos = async (): Promise<PhotoData[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/photos`);

    if (!res.ok) {
      throw new Error("Failed to get all photos");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updatePhotoSelection = async (photosIds: string[]) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/photos/selected`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selection: photosIds }),
      },
    );
    if (!res.ok) {
      throw new Error("Failed to update photo selection");
    }
  } catch (error) {
    console.error(error);
  }
};
export const getSelectedPhotos = async (): Promise<PhotoData[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/photos/selected`,
    );
    if (!res.ok) {
      throw new Error("Failed to get selected photos");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const clearPhotosCache = async ({
  key,
  queryClient,
}: {
  key: "photos" | "photos-selected";
  queryClient: QueryClient;
}) => {
  // fetch clear cache api
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/photos/clear-cache`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      },
    );
    if (!res.ok) {
      throw new Error("Failed to clear cache");
    }

    await queryClient.invalidateQueries({ queryKey: [key] });
  } catch (error) {
    console.error(
      `Error clearing cache: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};
