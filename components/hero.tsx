import Image from "next/image";
import Link from "next/link";

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
        className={`${instrumentSerif.className} max-w-5xl text-5xl leading-tight sm:text-5xl lg:text-6xl`}
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

      <div className="relative mt-16 w-full max-w-6xl">
        <div className="pointer-events-none absolute -inset-10 -z-10 bg-white/5 blur-3xl" />

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-1.5 shadow-2xl shadow-black/70">
          <Image
            src="/hero.png"
            alt="OneDrop"
            width={1683}
            height={934}
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
            className="h-auto w-full rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
