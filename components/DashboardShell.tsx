"use client";

import React, { useRef, useState } from "react";
import { Instrument_Serif } from "next/font/google";
import { IconUpload, IconX } from "@tabler/icons-react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Sidebar } from "./ui/sidebar";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/upload";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const MAX_FILES = 5;
const LINK_EXPIRY_HOURS = 24;

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
    <div className="relative flex h-screen w-full overflow-hidden bg-[#050505] font-sans text-[#f4f4f4]">
      <Sidebar open={open} user={user} />
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="absolute top-5 z-10 flex h-5 w-5 cursor-pointer items-center justify-center text-[#f4f4f4]"
        style={{ left: open ? 270 : 90 }}
        aria-label={open ? "Collapse sidebar" : "Open sidebar"}
      >
        {open ? <PanelLeftClose size={26} /> : <PanelLeftOpen size={26} />}
      </button>
      <CreateShareLinkDashboard />
    </div>
  );
}

function CreateShareLinkDashboard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => {
      const combined = [...prev, ...newFiles];
      if (combined.length > MAX_FILES) {
        setError(`You can only upload up to ${MAX_FILES} files at once.`);
        return prev;
      }
      setError(null);
      return combined;
    });
  };

  const handleCreateLink = async () => {
    if (files.length === 0) {
      setError("Add at least one file to create a share link.");
      return;
    }

    if (passwordEnabled && password.trim().length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    setError(null);

    try {
      setIsUploading(true);
      console.log("Starting upload to Cloudinary...");

      const uploadedResults = await Promise.all(
        files.map((file) => uploadToCloudinary(file)),
      );

      console.log("Uploaded files successfully:", uploadedResults);
    } catch (err) {
      console.log("Upload error:", err);
      setError("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-[#050505]">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 p-6 md:p-10 mt-10">
        <header className="space-y-2">
          <h1
            className={cn(
              instrumentSerif.className,
              "text-4xl leading-tight text-[#f4f4f4] md:text-5xl",
            )}
          >
            Create a shareable link
          </h1>
          <p className="text-sm text-neutral-500 md:text-base">
            Upload files and share them securely. Links expire after 24 hours.
          </p>
        </header>

        <label
          htmlFor="file-upload"
          className={cn(
            "flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-6 text-center transition-colors",
            isDragging
              ? "border-neutral-400 bg-neutral-800/80"
              : "border-neutral-700 bg-neutral-900 hover:bg-neutral-800/80",
          )}
        >
          <IconUpload className="mb-3 h-8 w-8 text-neutral-400" />
          <span className="text-sm font-medium text-neutral-100">
            Drop files here or click to browse
          </span>
          <span className="mt-1 text-xs text-neutral-500">
            Up to {MAX_FILES} files, 50 MB each
          </span>
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-neutral-900 px-3 py-2 text-sm"
              >
                <span className="truncate text-neutral-300">{file.name}</span>
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="text-neutral-500 hover:text-white"
                >
                  <IconX size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <section className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="password-protection"
              className="text-sm text-neutral-300"
            >
              Password Protection
            </label>
            <Switch
              id="password-protection"
              checked={passwordEnabled}
              onCheckedChange={(checked) => {
                setPasswordEnabled(checked);
                if (!checked) {
                  setPassword("");
                }
              }}
            />
          </div>

          {passwordEnabled && (
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter a password"
              className="h-10 border-neutral-700 bg-[#050505] text-neutral-100 placeholder:text-neutral-600"
            />
          )}
        </section>

        {error && (
          <p className="rounded-md border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={handleCreateLink}
          disabled={files.length === 0 || isUploading}
          className="h-11 w-full rounded-full bg-white text-sm font-medium text-black transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Create share link"}
        </button>
      </div>
    </main>
  );
}
