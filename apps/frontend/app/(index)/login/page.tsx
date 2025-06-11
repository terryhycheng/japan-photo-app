import { redirect } from "next/navigation";
import LoginClientPage from "./client";
import { cookies } from "next/headers";

const LoginPage = async (props: {
  searchParams?: Promise<{
    error?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  if (token) {
    redirect("/admin/manage-resources");
  }

  return <LoginClientPage errorSearchParams={searchParams?.error} />;
};

export default LoginPage;
