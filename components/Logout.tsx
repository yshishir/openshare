"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

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
      className="flex h-10 w-full cursor-pointer items-center justify-start gap-3 rounded-lg border border-neutral-800/60 bg-neutral-900/50 px-3 text-sm text-neutral-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
    >
      <LogOut className="h-4 w-4 shrink-0" />
      {!compact && <span>Log out</span>}
    </button>
  );
}
