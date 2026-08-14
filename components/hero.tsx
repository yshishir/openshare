import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

import { Instrument_Serif } from "next/font/google";
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

type HeroProps = {
  isAuthenticated: boolean;
};

export default function Hero({ isAuthenticated }: HeroProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-6 pb-16 pt-20 text-center lg:px-8 lg:pt-23">
      <h1
        className={`${instrumentSerif.className} max-w-5xl text-6xl leading-tight sm:text-5xl lg:text-6xl`}
      >
        Share your photos, videos & files securely with one simple link
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-6 text-zinc-400 sm:text-lg">
        Upload photos, videos, and files, protect them with a password, and
        share them with confidence.
      </p>

      <Link
        href={isAuthenticated ? "/dashboard" : "/login"}
        className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
      >
        {isAuthenticated ? "Go to dashboard" : "Get Started"}
      </Link>

      <div className="relative mt-16 w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl shadow-black/50 sm:p-10">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-zinc-100/[0.04] to-transparent" />

        <div className="relative flex items-center justify-between border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
              <FaChevronRight className="h-3 w-3 -rotate-180 text-zinc-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">vacation-photos</p>
              <p className="text-xs text-zinc-500">Expires in 23h 12m</p>
            </div>
          </div>
          <div className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 font-mono text-xs text-zinc-400">
            share.openshare.app/8Fk2a
          </div>
        </div>

        <div className="relative mt-5 flex flex-col gap-3 sm:flex-row">
          {[
            { label: "IMG_2041.jpg", meta: "2.4 MB" },
            { label: "IMG_2042.jpg", meta: "3.1 MB" },
            { label: "IMG_2043.jpg", meta: "1.8 MB" },
          ].map((file) => (
            <div
              key={file.label}
              className="flex flex-1 items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-rose-500/20">
                  <FaChevronRight className="h-3 w-3 -rotate-90 text-zinc-300" />
                </span>
                <span className="text-xs font-medium text-zinc-300">
                  {file.label}
                </span>
              </div>
              <span className="text-[10px] text-zinc-600">{file.meta}</span>
            </div>
          ))}
        </div>

        <div className="relative mt-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <p className="text-xs text-emerald-300">
            Link is live — anyone with it can view your files.
          </p>
        </div>
      </div>
    </main>
  );
}
