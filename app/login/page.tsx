"use client";

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  return (
    <button
      onClick={() =>
        authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        })
      }
    >
      Continue with Google
    </button>
  );
}