import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }) {
  const cookieStore = cookies();

  const token = cookieStore.get("token");
  if (token) {
    redirect("/dashboard/discover");
  }

  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
