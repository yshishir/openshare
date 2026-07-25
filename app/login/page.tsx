import LoginPage from "@/components/LoginPage";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/dashboard");
  }

  return <LoginPage />;
}
