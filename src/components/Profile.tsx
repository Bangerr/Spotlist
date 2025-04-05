"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProfileData {
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
  followers: { total: number };
}
const Profile = ({ session }: { session: any }) => {
  const [userData, setUserData] = useState<ProfileData | null>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const profileData = await response.json();
          setUserData(profileData);
        }
      } catch (error) {
        console.error("Could not get profile", error);
      }
    }
    getProfile();
  }, []);
  return (
    <div className="mt-8 w-full flex flex-col gap-5 flex-nowrap justify-around items-center">
      <Image
        src={
          userData?.images[0].url ||
          "https://spotiy-playlist-retriever-experimental.vercel.app/_next/static/media/user_img.6db01878.svg"
        }
        width={100}
        height={50}
        className="border rounded-full"
        alt="Spotify Profile"
      />
      <div className="flex flex-row gap-8 w-full px-10">
        <div className="flex flex-col gap-4 basis-1/2">
          <p>Name</p>
          <p>Email</p>
          <p>Followers</p>
        </div>
        <div className="flex flex-col gap-4 basis-1/2">
          <p className="bold-txt">{userData?.display_name}</p>
          <p className="bold-txt">{userData?.email}</p>
          <p className="bold-txt">{userData?.followers.total}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
