import Image from "next/image";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/next-auth/authOptions";
import { redirect } from "next/navigation";
import { TASK_MANAGEMENT_PAGE } from "@/config/route/page-routes";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  console.log("helooooooooooooooooooooooo");
  const session: any = await getServerSession(authOptions);
  if (session) {
    redirect(TASK_MANAGEMENT_PAGE);
  }

  return (
    <div className="flex h-screen w-full">
      <div
        className="m-auto flex w-2/3 items-center justify-center gap-9 rounded-xl bg-white p-10
      shadow-lg"
      >
        <div className="m-8 flex sm:w-full lg:w-2/3">
          <div className="m-auto w-3/4">{children}</div>
        </div>
        <div className="ml-auto sm:hidden lg:block">
          <Image src="/image/auth-image.png" width={645} height={769} alt="Auth image" />
        </div>
      </div>
    </div>
  );
}
