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
      className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white ${
        compact ? "md:justify-center" : ""
      }`}
    >
      <FiLogOut className="size-5 shrink-0" />
      <span className={compact ? "md:hidden" : ""}>Log out</span>
    </button>
  );
}
