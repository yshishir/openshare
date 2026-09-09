"use client";

import { FormEvent, useState } from "react";
import { Download, FileText, LockKeyhole } from "lucide-react";

type SharedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  cloudinaryUrl: string;
};

type PasswordProtectedShareProps = {
  shareToken: string;
};

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PasswordProtectedShare({
  shareToken,
}: PasswordProtectedShareProps) {
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<SharedFile[] | null>(null);
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsChecking(true);

    try {
      const response = await fetch(
        `/api/shares/${shareToken}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not verify password");
        return;
      }

      setFiles(data.files);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsChecking(false);
    }
  }

  if (files) {
    return (
      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <FileText className="h-4 w-4 shrink-0 text-neutral-400" />

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {file.name}
                </p>

                <p className="mt-0.5 text-xs text-neutral-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <a
              href={file.cloudinaryUrl}
              target="_blank"
              rel="noreferrer"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-950 hover:bg-neutral-200"
            >
              <Download className="h-3.5 w-3.5" />
              Open
            </a>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
        <LockKeyhole className="h-4 w-4 text-neutral-300" />
      </div>

      <h2 className="mt-5 text-base font-medium">
        Password protected
      </h2>

      <p className="mt-1 text-sm text-neutral-500">
        Enter the password to access these files.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          required
          className="h-10 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-neutral-600"
        />

        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={isChecking}
          className="h-10 w-full rounded-lg bg-neutral-100 text-sm font-medium text-neutral-950 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isChecking ? "Checking..." : "View files"}
        </button>
      </form>
    </div>
  );
}