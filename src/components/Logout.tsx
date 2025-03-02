"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const Logout = () => {
  const handleLogout = async () => {
    await signOut();
    redirect("/");
  };

  return (
    <Button
      className="flex px-12 py-2 text-base tracking-widest border p-2 hover:cursor-pointer bg-secondary text-primary hover:bg-secondary hover:text-primary duration-500"
      onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
