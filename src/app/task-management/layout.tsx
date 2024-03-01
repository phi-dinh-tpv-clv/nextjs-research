import Header from "@/components/layout/Header";
import "../globals.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/next-auth/authOptions";
import { LOGIN_PAGE } from "@/config/route/page-routes";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session: any = await getServerSession(authOptions);
  if (!session) {
    redirect(LOGIN_PAGE);
  }

  return (
    <div className="relative flex">
      <Header />
      {children}
    </div>
  );
}
