import Link from "next/link";

export default function Hero() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-6 pb-16 pt-20 text-center lg:px-8 lg:pt-28">
      <div className="mb-6 rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-xs text-zinc-300">
        Simple, private file sharing
      </div>

      <h1 className="max-w-5xl font-serif text-5xl leading-tight tracking-tight sm:text-6xl lg:text-7xl">
        Share your files securely with one simple link
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
        Upload photos, videos, and files, protect them with a password, and
        share them with confidence.
      </p>

      <Link
        href="/register"
        className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
      >
        Start sharing
      </Link>

      <div className="mt-16 flex min-h-72 w-full max-w-5xl items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 text-sm text-zinc-500 sm:min-h-96">
        Product preview coming here
      </div>
    </main>
  );
}
