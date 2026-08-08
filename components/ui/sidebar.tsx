"use client";

import Image from "next/image";
import Link from "next/link";
import { Folder, Home, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Logout from "../Logout";

export type SidebarUser = {
  name: string;
  image?: string | null;
};

type AppSidebarProps = {
  open: boolean;
  user: SidebarUser;
};

const links = [
  { label: "Home", href: "/dashboard", icon: Home, active: true },
  { label: "Links", href: "#", icon: Folder },
];

export function Sidebar({ open, user }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r border-[#242424] bg-[#050505] text-[#f4f4f4] transition-[width] duration-200",
        open ? "w-64" : "w-20",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-[#242424] px-6">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <Image src="/O.svg" alt="Openshare logo" width={28} height={28} />
          {open && (
            <span className="text-lg font-semibold tracking-wide">
              OPENSHARE
            </span>
          )}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col px-4 py-4">
        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "flex h-11 items-center gap-4 rounded-md px-3.5 text-md text-[#f4f4f4]",
                  link.active && "bg-[#262626]",
                )}
              >
                <Icon size={20} />
                {open && <span>{link.label}</span>}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto space-y-3">
          <Logout compact={!open} />

          <div className="border-t border-[#242424] pt-4">
            <button
              type="button"
              className="flex h-10 w-full items-center gap-3 rounded-sm px-2 text-left text-[#f4f4f4]"
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="h-8 w-8 rounded-sm object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#262626] text-sm font-medium">
                  <User />
                </div>
              )}
              {open && (
                <>
                  <span className="text-md">{user.name}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}
