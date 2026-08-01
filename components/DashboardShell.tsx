"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUpload,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

export type DashboardUser = {
  name: string;
  email: string;
  image?: string | null;
};

type DashboardShellProps = {
  user: DashboardUser;
};

export function DashboardShell({ user }: DashboardShellProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

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
    <div
      className={cn(
        "flex h-screen w-full flex-1 flex-col overflow-hidden border border-neutral-700 bg-neutral-800 font-sans md:flex-row",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="group/sidebar flex items-center justify-start gap-2 py-2"
              >
                <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  className="inline-block whitespace-pre !p-0 !m-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200"
                >
                  Logout
                </motion.span>
              </button>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user.name,
                href: "#",
                icon: user.image ? (
                  <Image
                    src={user.image}
                    className="h-7 w-7 shrink-0 rounded-full object-cover"
                    width={28}
                    height={28}
                    alt={user.name + " profile"}
                  />
                ) : (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-700 text-xs font-medium text-white">
                    {getInitials(user.name)}
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src="/O.svg" alt="Openshare logo" width={28} height={28} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white text-2xl"
      >
        Openshare
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src="/O.svg" alt="Openshare logo" width={28} height={28} />
    </a>
  );
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-700 bg-neutral-900 p-2 md:p-10">
        <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-700 bg-neutral-800 px-6 text-center transition-colors hover:bg-neutral-800/80">
          <IconUpload className="mb-3 h-8 w-8 text-neutral-400" />
          <span className="text-sm font-medium text-neutral-100">
            Upload files
          </span>
          <span className="mt-1 text-xs text-neutral-500">
            Choose a file to create a secure share link.
          </span>
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
};
