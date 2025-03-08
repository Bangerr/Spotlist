"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const Login = () => {
  const handleLogin = async () => {
    await signIn();
    redirect("/");
  };

  return (
    <Button
      className="flex px-12 py-2 text-base tracking-widest border p-2 hover:cursor-pointer text-black bg-secondary hover:text-white hover:bg-black dark:bg-primary 
      dark:hover:bg-secondary duration-500"
      onClick={handleLogin}>
      Login
    </Button>
  );
};

export default Login;
