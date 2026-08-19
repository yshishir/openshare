"use client";

import React, { useRef, useState } from "react";
import { Instrument_Serif } from "next/font/google";
import { Upload, X, FileText } from "lucide-react";
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
    <div className="flex h-screen w-full overflow-hidden bg-neutral-950 font-sans text-neutral-100">
      <Sidebar open={open} onToggle={() => setOpen((prev) => !prev)} user={user} />
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
      const uploadedResults = await Promise.all(
        files.map((file) => uploadToCloudinary(file)),
      );
      console.log("Uploaded files successfully:", uploadedResults);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-neutral-950">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-6 py-12">
        <header className="space-y-1.5">
          <h1
            className={cn(
              instrumentSerif.className,
              "text-3xl text-neutral-100 md:text-5xl",
            )}
          >
            Create shareable link
          </h1>
          <p className="text-xs text-neutral-400 md:text-sm">
            Upload files and share them securely. Links expire automatically after 24 hours.
          </p>
        </header>

        <label
          htmlFor="file-upload"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files) {
              addFiles(Array.from(e.dataTransfer.files));
            }
          }}
          className={cn(
            "flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition-colors",
            isDragging
              ? "border-neutral-400 bg-neutral-900/90"
              : "border-neutral-800 bg-neutral-900/40 ",
          )}
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center text-neutral-300">
            <Upload size={18} />
          </div>
          <span className="text-sm font-medium text-neutral-200">
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
                className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/50 px-3.5 py-2.5 text-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="h-4 w-4 shrink-0 text-neutral-400" />
                  <span className="truncate text-xs font-medium text-neutral-200">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="text-neutral-400  hover:text-neutral-100 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <section className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <label
                htmlFor="password-protection"
                className="text-xs font-medium text-neutral-200 cursor-pointer"
              >
                Password Protection
              </label>
              <p className="text-[11px] text-neutral-500">
                Require a password to access shared files
              </p>
            </div>
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
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password (min. 4 characters)"
                className="h-9 border-neutral-800 bg-neutral-950 text-xs text-neutral-100 placeholder:text-neutral-600 focus:border-neutral-700"
              />
            </div>
          )}
        </section>

        {error && (
          <p className="rounded-lg border border-red-900/40 bg-red-950/20 px-3.5 py-2 text-xs text-red-400">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleCreateLink}
          disabled={files.length === 0 || isUploading}
          className="h-10 w-full rounded-lg bg-neutral-100 text-xs font-medium text-neutral-950 transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          {isUploading ? "Uploading..." : "Create share link"}
        </button>
      </div>
    </main>
  );
}
