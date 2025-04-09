"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Layout from "../../components/Layout";

export default function Login() {
  const handleLogin = async () => {
    await signIn(undefined, { callbackUrl: "/" });
  };

  return (
    <Layout title="Log in to Spotify">
      <div className="flex flex-col items-center justify-center w-full h-screen gap-20">
        <Image
          src="/images/spotify_logo2.png"
          alt="spotify logo"
          width={320}
          height={96}
          objectFit="contain"
        />
        <button
          className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-secondary hover:bg-opacity-80"
          onClick={handleLogin}>
          Login
        </button>
      </div>
    </Layout>
  );
}
