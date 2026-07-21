"use client";

import { authClient } from "@/lib/auth-client";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

export default function LoginPage() {
  const [isCreateAccount, setIsCreateAccount] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleEmailAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (isCreateAccount) {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Could not create account");
      }

      return;
    }

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      setError(error.message || "Could not sign in");
    }
  }

  return (
    <main className="grid min-h-screen bg-[#070707] text-white lg:grid-cols-2">
      <section className="hidden min-h-screen px-6 py-4 lg:block">
        <div className="relative h-full overflow-hidden rounded-xl">
          <Image
            src="/login.jpeg"
            alt="Secure file sharing"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
          <Link href="/">
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center gap-3">
            <Image src="/O.svg" alt="Openshare logo" width={30} height={30} />
            <p className="text-lg font-semibold">Openshare</p>
          </div>
          </Link>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1
            className={`${instrumentSerif.className} text-4xl font-semibold items-center justify-center flex tracking-wide`}
          >
            {isCreateAccount ? "Create Account" : "Welcome back"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400 flex items-center justify-center">
            {isCreateAccount
              ? "Enter your details to create your account."
              : "Log back in to start sharing your files"}
          </p>

          <button
            onClick={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-full px-4 text-sm text-neutral-100 border-zinc-800 border-[0.5px] cursor-pointer"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-sm text-zinc-500">or</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isCreateAccount && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium text-zinc-400"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-zinc-800  px-3 text-sm outline-none transition focus:border-zinc-600"
                  placeholder="Enter you name"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-zinc-400"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-11 w-full rounded-xl border border-zinc-800 px-3 text-sm outline-none transition focus:border-zinc-600"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium text-zinc-400"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="h-11 w-full rounded-xl border border-zinc-800 px-3 text-sm outline-none transition focus:border-zinc-600"
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              className="h-12 w-full rounded-full bg-white px-4 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 cursor-pointer"
            >
              {isCreateAccount ? "Create account" : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-zinc-500">
            {isCreateAccount ? "Already have an account?" : "Don\'t have a account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsCreateAccount(!isCreateAccount);
                setError("");
              }}
              className="font-medium text-white cursor-pointer"
            >
              {isCreateAccount ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
