"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiGithub,
  FiHome,
  FiLink2,
  FiMenu,
  FiSidebar,
  FiStar,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import Logout from "@/components/Logout";

export type DashboardUser = {
  name: string;
  email: string;
  image?: string | null;
};

type DashboardShellProps = {
  user: DashboardUser;
};

export default function DashboardShell({ user }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#070707] text-zinc-100">
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/70 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-zinc-800 bg-[#090909] transition-all duration-200 md:static md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "md:w-20" : "md:w-64"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-5">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image src="/O.svg" alt="OpenShare logo" width={28} height={28} />
            <span className={`font-semibold ${isCollapsed ? "md:hidden" : ""}`}>
              Openshare
            </span>
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setIsMobileOpen(false)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white md:hidden"
          >
            <FiX className="size-5" />
          </button>
        </div>

        <nav className="flex-1 p-3">
          <Link
            href="/dashboard"
            aria-current="page"
            title={isCollapsed ? "Home" : undefined}
            className={`flex items-center gap-3 rounded-xl bg-zinc-800 px-3 py-3 text-sm font-medium ${
              isCollapsed ? "md:justify-center" : ""
            }`}
          >
            <FiHome className="size-5 shrink-0" />
            <span className={isCollapsed ? "md:hidden" : ""}>Home</span>
          </Link>
        </nav>

        <div className="border-t border-zinc-800 p-3">
          <div
            className={`flex items-center gap-3 rounded-xl p-2 ${
              isCollapsed ? "md:justify-center" : ""
            }`}
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

            <div className={`min-w-0 flex-1 ${isCollapsed ? "md:hidden" : ""}`}>
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
            </div>
          </div>

          <Logout compact={isCollapsed} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-4 sm:px-6">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() => setIsMobileOpen(true)}
            className="rounded-lg border border-zinc-800 p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white md:hidden"
          >
            <FiMenu className="size-5" />
          </button>

          <button
            type="button"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            onClick={() => setIsCollapsed((value) => !value)}
            className="hidden rounded-lg border border-zinc-800 p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white md:block"
          >
            <FiSidebar className="size-5" />
          </button>

          <a
            href="https://github.com/yshishir/openshare"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            <FiGithub className="size-4" />
            <span>Star</span>
            <FiStar className="size-4" />
          </a>
        </header>

        <main className="flex-1 p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Your links</h1>
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
              <h2 className="mt-4 text-base font-medium">No shared links yet</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                Once you upload a file and create a link, it will show up here.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
