"use server";

import { cookies } from "next/headers";

export const loginAction = async (
  username: string,
  password: string,
): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  const cookieStore = await cookies();

  cookieStore.set("access_token", data.access_token);
};

export const logoutAction = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
};

export const verifyAction = async (): Promise<{ token: string } | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (!token) return null;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  if (!response.ok) {
    await logoutAction();
    return null;
  }

  return { token: token.value };
};
