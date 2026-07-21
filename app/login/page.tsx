"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";

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
      <section className="hidden min-h-screen p-6 lg:block">
        <div className="relative h-full overflow-hidden rounded-3xl">
          <Image
          src="/login.jpeg"
          alt="Secure file sharing"
          fill
          priority
          className="object-cover"
        />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <p className="mb-3 text-sm font-medium text-zinc-400">OpenShare</p>
          <h1 className="text-3xl font-semibold">
            {isCreateAccount ? "Create Account" : "Welcome back"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {isCreateAccount
              ? "Enter your details to create your account."
              : "Sign in to upload files and manage your secure sharing links."}
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

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-xs text-zinc-500">or</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isCreateAccount && (
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-medium text-zinc-400">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none transition focus:border-zinc-600"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-medium text-zinc-400">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none transition focus:border-zinc-600"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-medium text-zinc-400">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none transition focus:border-zinc-600"
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-lime-400 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-lime-300"
            >
              {isCreateAccount ? "Create account" : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-zinc-500">
            {isCreateAccount ? "Already have an account?" : "New here?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsCreateAccount(!isCreateAccount);
                setError("");
              }}
              className="font-medium text-white"
            >
              {isCreateAccount ? "Log in" : "Create account"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
