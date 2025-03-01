"use client";
import { useSession } from "next-auth/react";
import Login from "./login/page";

export default function Home() {
  const session = useSession();

  if (!session || session.status !== "authenticated") {
    console.log("Entered");
    return <Login />;
  }

  return (
    <main className="w-full px-10 md:w-[30%] mx-auto h-full">
      {/* Playlists */}
      <div></div>
    </main>
  );
}
