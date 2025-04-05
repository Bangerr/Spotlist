"use client";
import React from "react";
import Link from "next/link";
import Logout from "./Logout";
import Login from "./Login";
import { ModeToggle } from "./ModeToggle";

const Navbar = ({ session }: { session: any }) => {
  return (
    <div className="w-full px-10 lg:w-[50%] md:w-[75%] mx-auto flex justify-between items-center mt-5">
      <Link
        href="/"
        className="border rounded-lg p-2 hover:cursor-pointer bg-secondary tracking-widest text-black dark:text-primary hover:-translate-y-2 dark:bg-secondary 
        dark:hover:text-primary duration-500">
        Spotlist
      </Link>
      <div className=" flex flex-row gap-4">
        <ModeToggle />

        {!session ? <Login /> : <Logout />}
      </div>
    </div>
  );
};

export default Navbar;
