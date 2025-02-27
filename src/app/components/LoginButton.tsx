"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Welcome, {session.user.name}</p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <Button onClick={() => signIn("spotify")}>Sign in with Spotify</Button>
  );
}
