"use client";
import React, { useState } from "react";
import { Sidebar, SubscribeButton } from "./ui/sidebar";
import { IconUpload } from "@tabler/icons-react";

export type DashboardUser = {
  name: string;
  email: string;
  image?: string | null;
};

type DashboardShellProps = {
  user: DashboardUser;
};

export function DashboardShell({ user }: DashboardShellProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#050505] font-sans text-[#f4f4f4]">
      <Sidebar open={open} setOpen={setOpen} user={user} />
      <Dashboard />
    </div>
  );
}

const Dashboard = () => {
  return (
    <main className="flex flex-1 flex-col bg-[#050505]">
      <div className="flex flex-1 flex-col gap-4 p-2 md:p-10">
        <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-700 bg-neutral-900 px-6 text-center transition-colors hover:bg-neutral-800/80">
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
    </main>
  );
};
