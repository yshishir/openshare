"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Folder,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sparkles,
  Bug,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarUser = {
  name: string;
  image?: string | null;
};

type AppSidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: SidebarUser;
};

const links = [
  { label: "Home", href: "/dashboard", icon: Home, active: true },
  { label: "Projects", href: "#", icon: Folder },
  { label: "Calendar", href: "#", icon: CalendarDays },
];

export function Sidebar({ open, setOpen, user }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r border-[#242424] bg-[#050505] text-[#f4f4f4] transition-[width] duration-200",
        open ? "w-64" : "w-18",
      )}
    >
      <div className="flex h-18 items-center justify-between border-b border-[#242424] px-6">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <Image src="/O.svg" alt="Openshare logo" width={28} height={28} />
          {open && <span className="text-lg font-semibold tracking-wide">OPENSHARE</span>}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex h-5 w-5 cursor-pointer items-center justify-center text-[#f4f4f4]"
          aria-label={open ? "Collapse sidebar" : "Open sidebar"}
        >
          {open ? <PanelLeftClose size={24} /> : <PanelLeftOpen size={24} />}
        </button>
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
                  "flex h-12 items-center gap-4 rounded-lg px-4 text-lg text-[#f4f4f4]",
                  link.active && "bg-[#262626]",
                )}
              >
                <Icon size={22} />
                {open && <span>{link.label}</span>}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto space-y-3">
          <button
            type="button"
            className="flex h-12 w-full items-center gap-4 rounded-lg border border-[#7a5a00] bg-[#211b07] px-4 text-left text-[#f5bd00]"
          >
            <Bug size={21} />
            {open && (
              <>
                <span className="text-base">Report issue</span>
                <ExternalLink className="ml-auto" size={18} />
              </>
            )}
          </button>

          <Link
            href="#"
            className="flex h-12 items-center gap-4 rounded-lg px-4 text-lg text-[#f4f4f4]"
          >
            <Settings size={22} />
            {open && <span>Settings</span>}
          </Link>

          <div className="border-t border-[#242424] pt-4">
            <button
              type="button"
              className="flex h-12 w-full items-center gap-3 rounded-lg px-2 text-left text-[#f4f4f4]"
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#262626] text-sm font-medium">
                  {getInitials(user.name)}
                </div>
              )}
              {open && (
                <>
                  <span className="text-lg">{user.name}</span>
                  <ChevronDown className="ml-auto text-[#9ca3af]" size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SubscribeButton() {
  return (
    <button
      type="button"
      className="flex h-[60px] items-center gap-3 bg-[#141722] px-8 text-lg text-[#f4f4f4]"
    >
      <Sparkles className="text-[#9aa7ff]" size={22} />
      <span>Subscribe to</span>
    </button>
  );
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
