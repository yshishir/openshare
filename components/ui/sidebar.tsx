"use client";

import Image from "next/image";
import Link from "next/link";
import { Folder, Home, PanelLeftClose, PanelLeftOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Logout from "../Logout";

export type SidebarUser = {
  name: string;
  image?: string | null;
};

type AppSidebarProps = {
  open: boolean;
  onToggle: () => void;
  user: SidebarUser;
};

const links = [
  { label: "Home", href: "/dashboard", icon: Home, active: true },
  { label: "Links", href: "#", icon: Folder, active: false },
];

export function Sidebar({ open, onToggle, user }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r border-neutral-800 bg-neutral-950 text-neutral-100 transition-all duration-200 ease-in-out",
        open ? "w-64" : "w-16",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-neutral-800 px-4">
        {open ? (
          <>
            <Link href="/" className="flex items-center gap-3 overflow-hidden">
              <Image src="/O.svg" alt="Openshare logo" width={26} height={26} />
              <span className="text-sm font-semibold tracking-wider text-neutral-200">
                OPENSHARE
              </span>
            </Link>
            <button
              type="button"
              onClick={onToggle}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onToggle}
            className="mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen size={18} />
          </button>
        )}
      </div>

      <nav className="flex flex-1 flex-col justify-between px-3 py-4">
        <div className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors",
                  link.active
                    ? "bg-neutral-800 text-neutral-100 font-medium"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200",
                  !open && "justify-center px-0",
                )}
                title={!open ? link.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {open && <span>{link.label}</span>}
              </Link>
            );
          })}
        </div>

        <div className="space-y-3 pt-4 border-t border-neutral-800/80">
          <Logout compact={!open} />

          <div className="flex items-center gap-3 rounded-lg bg-neutral-900/40 p-2 border border-neutral-800/50">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-neutral-400">
                <User size={16} />
              </div>
            )}
            {open && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-neutral-200">
                  {user.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}
