"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiHome, FiLink2, FiUploadCloud } from "react-icons/fi";
import Logout from "@/components/Logout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Instrument_Serif } from "next/font/google";

export type DashboardUser = {
  name: string;
  email: string;
  image?: string | null;
};

type DashboardShellProps = {
  user: DashboardUser;
};
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

export default function DashboardShell({ user }: DashboardShellProps) {
  const [showLogout, setShowLogout] = useState(false);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-zinc-800 text-zinc-100">
        <SidebarHeader className="px-5 py-5 group-data-[collapsible=icon]:px-2">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image src="/O.svg" alt="logo" width={30} height={30} />
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-xl font-medium">
                Openshare
              </p>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent className="p-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive
                render={<Link href="/dashboard" aria-current="page" />}
              >
                <FiHome />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-3">
          <button
            type="button"
            onClick={() => setShowLogout((value) => !value)}
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-zinc-800 group-data-[collapsible=icon]:justify-center"
          >
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-800 text-sm font-semibold">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  width={40}
                  height={40}
                  className="size-10 object-cover"
                />
              ) : (
                initials || "U"
              )}
            </div>

            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-zinc-400">{user.email}</p>
            </div>
          </button>

          {showLogout && <Logout compact />}
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-h-screen bg-[#070707] text-zinc-100">
        <main className="flex-1 p-5 sm:p-8 lg:p-10">
          <SidebarTrigger className="mb-5 text-zinc-300 hover:bg-zinc-900 hover:text-white" />
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Your links
                </h1>
                <p className="mt-1 text-sm text-zinc-500">
                  Your shared files and links will appear here.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-zinc-200"
              >
                <FiUploadCloud className="size-4" />
                Upload files
              </button>
            </div>

            <section className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 px-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400">
                <FiLink2 className="size-5" />
              </div>
              <h2 className="mt-4 text-base font-medium">
                No shared links yet
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                Once you upload a file and create a link, it will show up here.
              </p>
            </section>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
