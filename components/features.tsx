import Link from "next/link";
import {
  Code,
  FileText,
  Image as ImageIcon,
  Key,
  Lock,
  Timer,
  UploadCloud,
  Video,
} from "lucide-react";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const fileCards = [
  { icon: ImageIcon, name: "photo.jpg", classes: "-rotate-3 bg-indigo-500/10" },
  { icon: Video, name: "clip.mp4", classes: "rotate-2 bg-rose-500/10" },
  { icon: FileText, name: "notes.pdf", classes: "-rotate-2 bg-amber-500/10" },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-zinc-700 to-transparent" />
      </div>

      <div className="relative">
        <div className="mb-14 flex flex-col items-center text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Features
          </p>
          <h2
            className={`${instrumentSerif.className} mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl`}
          >
            Simple by design, secure by default
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
            Upload once, share anywhere. OpenShare handles the rest — no
            accounts required to view.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:col-span-2 lg:col-span-7 lg:row-span-2">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-white">
                <UploadCloud className="h-5 w-5" />
              </div>
              <h3
                className={`${instrumentSerif.className} mt-6 text-3xl leading-tight`}
              >
                Any file, any size
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
                Drop in photos, videos, PDFs — anything you need to send. We
                host it, you share the link.
              </p>
            </div>

            <div className="mt-12 flex items-end gap-3 pt-4">
              {fileCards.map((file) => (
                <div
                  key={file.name}
                  className={`${file.classes} flex w-24 flex-col items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 py-5`}
                >
                  <file.icon className="h-6 w-6 text-zinc-300" />
                  <span className="max-w-full truncate px-2 text-[10px] text-zinc-500">
                    {file.name}
                  </span>
                </div>
              ))}
              <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-zinc-700 text-xs text-zinc-500">
                +
              </div>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 lg:col-span-5">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-white">
                <Lock className="h-5 w-5" />
              </div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700/80">
                <Lock className="h-6 w-6 text-zinc-300" />
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
                  <Key className="h-3 w-3 text-zinc-400" />
                </span>
              </div>
            </div>
            <div className="mt-8">
              <h3
                className={`${instrumentSerif.className} text-2xl leading-tight`}
              >
                Password protected
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400">
                Gate your link behind a password so only the people you choose
                can open it.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 lg:col-span-5">
            <div className="flex items-start justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-white">
                <Timer className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`${instrumentSerif.className} text-4xl leading-none`}
                >
                  24h
                </span>
                <div className="mt-2 h-1 w-16 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[85%] rounded-full bg-zinc-400" />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3
                className={`${instrumentSerif.className} text-2xl leading-tight`}
              >
                Links that expire
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400">
                Every link self-destructs after 24 hours. No cleanup, no
                clutter, no leftovers.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 md:col-span-2 lg:col-span-12 lg:flex-row lg:items-center">
            <div className="max-w-lg">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-white">
                <Code className="h-5 w-5" />
              </div>
              <h3
                className={`${instrumentSerif.className} mt-6 text-2xl leading-tight lg:text-3xl`}
              >
                Open source, end to end
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Built in the open and free to self-host. Your files, your
                server, your rules.
              </p>
            </div>

            <Link
              href="https://github.com/yshishir/openshare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              github.com/yshishir/openshare
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
