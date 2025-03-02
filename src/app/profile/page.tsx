"use client";
import React from "react";
import Profile from "../../components/Profile";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const session = useSession();

  return (
    <div className="w-full px-10 md:w-[30%] mx-auto h-full">
      <div className="w-full md:max-w-[19rem] h-[22rem] mx-auto rounded-3xl border-4 border-solid border-secondary dark:border-white flex justify-center items-center flex-col flex-nowrap mt-20 mb-16">
        <Profile session={session} />
      </div>
    </div>
  );
};

export default ProfilePage;
