import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { Clock3, Download, FileText, LockKeyhole } from "lucide-react";
import { prisma } from "@/lib/prisma";
import PasswordProtectedShare from "@/components/PasswordProtectedShare";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

type SharePageProps = {
  params: Promise<{
    shareToken: string;
  }>;
};

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function SharePage({
  params,
}: SharePageProps) {
  const { shareToken } = await params;

  const share = await prisma.share.findUnique({
    where: {
      shareToken,
    },
    include: {
      files: true,
    },
  });

  if (!share) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-100">
        <div className="text-center">
          <h1 className="text-xl font-medium">Share link not found</h1>
          <p className="mt-2 text-sm text-neutral-500">
            This link may be invalid or no longer available.
          </p>
        </div>
      </main>
    );
  }

  if (share.expiresAt < new Date()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-100">
        <div className="text-center">
          <h1 className="text-xl font-medium">This link has expired</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Ask the sender to create a new share link.
          </p>
        </div>
      </main>
    );
  }

  const expiresAt = share.expiresAt.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div className="mx-auto w-full max-w-xl">
        <header className="flex items-center gap-2.5">
          <Image
            src="/O.svg"
            alt="OpenShare logo"
            width={28}
            height={28}
          />
          <span className="text-sm font-medium">OpenShare</span>
        </header>

        <section className="mt-14">
          <h1
            className={`${instrumentSerif.className} text-4xl md:text-5xl`}
          >
            Files shared with you
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-400">
            Open or download the files below before this link expires.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
            <Clock3 className="h-3.5 w-3.5" />
            Expires {expiresAt}
          </div>
        </section>

        <section className="mt-8">
          {share.passwordHash ? (
            <PasswordProtectedShare shareToken={shareToken} />
          ) : (
            <div className="space-y-2">
              {share.files.map((file) => (
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
          )}
        </section>
      </div>
    </main>
  );
}