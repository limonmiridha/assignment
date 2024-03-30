import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Index() {
  const cookieStore = cookies();

  const token = cookieStore.get("token");
  if (!token) {
    redirect("/auth/login");
  } else {
    redirect("/dashboard/discover");
  }

  return <div></div>;
}
