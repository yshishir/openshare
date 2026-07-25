import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  isAuthenticated: boolean;
};

export default function Navbar({ isAuthenticated }: NavbarProps) {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <Image src="/O.svg" alt="OpenShare logo" width={27} height={27} />
        Openshare
      </Link>

      <div className="flex items-center gap-3">
        {!isAuthenticated && (
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm text-zinc-300 transition-colors hover:text-white"
          >
            Log in
          </Link>
        )}
        <Link
          href={isAuthenticated ? "/dashboard" : "/login"}
          className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
        >
          {isAuthenticated ? "Dashboard" : "Get Started"}
        </Link>
      </div>
    </header>
  );
}
