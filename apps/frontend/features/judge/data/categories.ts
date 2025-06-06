import { Category } from "../types/main";

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);

  if (!res.ok) {
    throw new Error(`Failed to get categories: ${await res.text()}`);
  }

  const data = await res.json();
  return data;
};
