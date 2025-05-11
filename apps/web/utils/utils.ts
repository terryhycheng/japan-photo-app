import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toTitleCase = (str: string) => {
  if (!str) {
    return "";
  }
  const strArr = str.split(" ").map((word: string) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  });
  return strArr.join(" ");
};

// Function to format date as "01/01/2003"
export function formatDate(date: Date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateToArray(date: any) {
  return [
    date.getFullYear(),
    date.getMonth() + 1, // Months are zero-indexed in JavaScript
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
}
