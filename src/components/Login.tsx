"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const Login = () => {
  const handleLogin = async () => {
    await signIn();
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
