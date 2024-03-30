import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const cookieStore = cookies();

  const token = cookieStore.get("token");
  if (!token) {
    redirect("/auth/login");
  }

  return (
    <div className="relative">
      <div>{children}</div>
    </div>
  );
}
