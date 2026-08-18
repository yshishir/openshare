import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Get Started", href: "/login" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/yshishir/openshare" },
      {
        label: "Open an issue",
        href: "https://github.com/yshishir/openshare/issues",
      },
      { label: "Star the repo", href: "https://github.com/yshishir/openshare" },
    ],
  },
  {
    heading: "Project",
    links: [
      { label: "Open Source", href: "https://github.com/yshishir/openshare" },
      { label: "MIT License", href: "https://github.com/yshishir/openshare" },
      { label: "Self-host", href: "https://github.com/yshishir/openshare" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/70 bg-[#070707]">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-12 py-16 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Image src="/O.svg" alt="OpenShare logo" width={27} height={27} />
              Openshare
            </Link>
            <p className="mt-4 text-sm leading-6 text-zinc-500">
              The simple, secure way to share files with a single link. Free,
              open source, and yours to host.
            </p>
            <a
              href="https://github.com/yshishir/openshare"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              <FaStar className="text-yellow-400" />
              Star on GitHub
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.heading}>
                <h4 className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
                  <span className="h-px w-4 bg-lin from-zinc-500 to-transparent" />
                  {column.heading}
                </h4>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800/70 pt-8">
          <div
            className={`${instrumentSerif.className} pointer-events-none select-none overflow-hidden bg-gradient-to-b from-zinc-500/60 via-zinc-700/25 to-transparent bg-clip-text text-center text-[22vw] leading-[0.8] tracking-tight text-transparent lg:text-[16rem]`}
          >
            Openshare
          </div>
          <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-zinc-600 sm:flex-row">
            <p>©2026 OpenShare. Open source under the MIT License.</p>
            <p className="flex items-center gap-1.5">
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
