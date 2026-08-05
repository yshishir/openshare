"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

type LogoutProps = {
  compact?: boolean;
};

export default function Logout({ compact = false }: LogoutProps) {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
          router.refresh();
        },
      },
    });
  }
  return (
    <button
      type="button"
      onClick={handleLogout}
      title={compact ? "Log out" : undefined}
      className={`flex h-12 w-full items-center gap-4 rounded-lg border border-[#7a0000] bg-[#210707] px-4 text-left text-red-500 transition-colors hover:bg-[#2a0909] hover:text-red-400 cursor-pointer ${
        compact ? "md:justify-center" : ""
      }`}
    >
      <FiLogOut className="size-5 shrink-0" />
      <span className={`text-base ${compact ? "md:hidden" : ""}`}>Logout</span>
    </button>
  );
}
