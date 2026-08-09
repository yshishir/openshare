"use client";

import React, { useRef, useState } from "react";
import { Instrument_Serif } from "next/font/google";
import { IconCheck, IconCopy, IconUpload, IconX } from "@tabler/icons-react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Sidebar } from "./ui/sidebar";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const MAX_FILES = 5;
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const LINK_EXPIRY_HOURS = 24;

export type DashboardUser = {
  name: string;
  email: string;
  image?: string | null;
};

type DashboardShellProps = {
  user: DashboardUser;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function generateShareToken(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

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
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const addFiles = (incoming: FileList | File[]) => {
    setError(null);
    const next = [...files];

    for (const file of Array.from(incoming)) {
      if (next.length >= MAX_FILES) {
        setError(`You can upload up to ${MAX_FILES} files per link.`);
        break;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}" exceeds the 50 MB limit.`);
        continue;
      }

      if (next.some((existing) => existing.name === file.name && existing.size === file.size)) {
        continue;
      }

      next.push(file);
    }

    setFiles(next);
  };

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index));
    setError(null);
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

    setIsCreating(true);
    setError(null);

    // Placeholder until upload API is wired up.
    await new Promise((resolve) => setTimeout(resolve, 600));

    const token = generateShareToken();
    setShareUrl(`${window.location.origin}/s/${token}`);
    setIsCreating(false);
  };

  const handleCopy = async () => {
    if (!shareUrl) return;

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setFiles([]);
    setPasswordEnabled(false);
    setPassword("");
    setShareUrl(null);
    setCopied(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="flex flex-1 flex-col overflow-y-auto bg-[#050505]">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 p-6 md:p-10">
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
            Upload files and share them securely. Links expire after{" "}
            {LINK_EXPIRY_HOURS} hours.
          </p>
        </header>

        {shareUrl ? (
          <section className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-900/60 p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-neutral-100">Your link is ready</p>
              <p className="text-xs text-neutral-500">
                Expires in {LINK_EXPIRY_HOURS} hours
                {passwordEnabled ? " · Password protected" : ""}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-md border border-neutral-700 bg-[#050505] p-3">
              <span className="min-w-0 flex-1 truncate text-sm text-neutral-300">
                {shareUrl}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
              >
                {copied ? (
                  <>
                    <IconCheck className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <IconCopy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              {files.length} file{files.length === 1 ? "" : "s"} included in this link.
            </p>

            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-neutral-400 transition-colors hover:text-neutral-200"
            >
              Create another link
            </button>
          </section>
        ) : (
          <>
            <label
              htmlFor="file-upload"
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                addFiles(event.dataTransfer.files);
              }}
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
                onChange={(event) => {
                  if (event.target.files) {
                    addFiles(event.target.files);
                  }
                  event.target.value = "";
                }}
              />
            </label>

            {files.length > 0 && (
              <section className="space-y-3">
                <p className="text-sm text-neutral-400">
                  Selected files ({files.length}/{MAX_FILES})
                </p>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={`${file.name}-${file.size}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm text-neutral-100">{file.name}</p>
                        <p className="text-xs text-neutral-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="shrink-0 rounded-md p-1 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
                        aria-label={`Remove ${file.name}`}
                      >
                        <IconX className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-900/40 p-5">
              <p className="text-sm font-medium text-neutral-200">Link options</p>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={passwordEnabled}
                    onChange={(event) => {
                      setPasswordEnabled(event.target.checked);
                      if (!event.target.checked) {
                        setPassword("");
                      }
                    }}
                    className="h-4 w-4 rounded border-neutral-600 bg-neutral-900 accent-white"
                  />
                  <span className="text-sm text-neutral-300">Password protect</span>
                </label>

                {passwordEnabled && (
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter a password"
                    className="h-10 w-full rounded-md border border-neutral-700 bg-[#050505] px-3 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none focus:border-neutral-500"
                  />
                )}
              </div>
            </section>

            {error && (
              <p className="rounded-md border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleCreateLink}
              disabled={isCreating || files.length === 0}
              className="h-11 w-full rounded-full bg-white text-sm font-medium text-black transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCreating ? "Creating link..." : "Create share link"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
