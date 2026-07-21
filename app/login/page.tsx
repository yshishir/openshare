"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-[#070707] text-white lg:grid-cols-2">
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <p className="mb-3 text-sm font-medium text-zinc-400">OpenShare</p>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Sign in to upload files and manage your secure sharing links.
          </p>

          <button
            onClick={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-white px-4 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            <span className="flex size-5 items-center justify-center rounded-full border border-zinc-300 text-xs font-semibold">
              G
            </span>
            Continue with Google
          </button>
        </div>
      </section>

      <section className="relative hidden min-h-screen lg:block">
        <Image
          src="/login.jpeg"
          alt="Secure file sharing"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
      </section>
    </main>
  );
}
