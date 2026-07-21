import Link from "next/link";
import { FaChevronRight, FaStar } from "react-icons/fa";

import { Instrument_Serif } from "next/font/google";
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-6 pb-16 pt-20 text-center lg:px-8 lg:pt-23">
      <a
        href="https://github.com/yshishir/openshare"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-zinc-800 bg-zinc-900/70 px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
      >
        <FaStar className="text-yellow-400" />
        Star us on Github
        <FaChevronRight className="text-[10px] text-zinc-500" />
      </a>

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
        href="/register"
        className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
      >
        Get Stared
      </Link>

      <div className="mt-16 flex min-h-72 w-full max-w-5xl items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 text-sm text-zinc-500 sm:min-h-96">
        Product preview coming here
      </div>
    </main>
  );
}
