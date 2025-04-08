"use client";
import { Artist, Track } from "@/types/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const TopItems = () => {
  const [topTracks, setTopTracks] = useState<Track[] | null>(null);
  const [topArtists, setTopArtists] = useState<Artist[] | null>(null);

  useEffect(() => {
    async function fetchTopTracks() {
      try {
        const response = await fetch("/api/topTracks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTopTracks(data.items);
        } else {
          throw new Error("Failed to fetch top Tracks.");
        }
      } catch (err) {
        console.error("Top tracks fetching failed Step: ", err);
      }
    }

    fetchTopTracks();
  }, []);

  useEffect(() => {
    async function fetchTopArtists() {
      try {
        const response = await fetch("/api/topArtists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTopArtists(data.items);
        } else {
          throw new Error("Failed to fetch top artists.");
        }
      } catch (err) {
        console.error("Top artists fetching failed Step: ", err);
      }
    }

    fetchTopArtists();
  }, []);

  return (
    <div className="mt-10">
      {/* App Introduction */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          Your Top Spotify Picks
        </h1>
        <p className="text-lg text-gray-400 dark:text-gray-300">
          Discover your most played tracks and artists from the last 6 months.
        </p>
      </div>
      {/* List: Top Tracks and Top Artists */}
      <div className="bg-secondary border border-black dark:border-primary rounded-3xl ">
        <table className="min-w-full">
          <thead className="border-b border-b-black dark:border-primary">
            <tr>
              <th className="">
                <p className="px-2 py-8 ml-16 text-left text-lg font-semibold text-gray-700 dark:text-[#d6cfcf]">
                  Top Tracks
                </p>
              </th>
              <th className="">
                <p className="px-2 py-8 ml-16 text-left text-lg font-semibold text-gray-700 dark:text-[#d6cfcf]">
                  Top Artists
                </p>
              </th>
            </tr>
          </thead>

          <tbody className="w-full p-10">
            {/* Top Tracks */}
            {topTracks?.map((track, index) => (
              <tr key={index} className="">
                <td className="w-1/2 md:px-10 px-2 py-3 text-[#424242] dark:text-[#a19a9a] font-medium hover:text-[#a19a9a] dark:hover:text-[#6c6b6b]">
                  <a
                    key={index}
                    className="flex flex-row gap-3 items-center"
                    href={track.external_urls.spotify}
                    target="_blank">
                    <span>{index + 1}. </span>

                    <Image
                      src={track.album.images[0].url}
                      alt="profilePicture"
                      width={50}
                      height={50}
                      className="border rounded-full"
                    />
                    {track.name}
                  </a>
                </td>
              </tr>
            ))}
            {/* Top Artists */}
            {topArtists?.map((artist, index) => (
              <tr key={index} className="">
                <td className="w-1/2 md:px-10 px-2 py-3 text-[#424242] dark:text-[#a19a9a] font-medium hover:text-[#a19a9a] dark:hover:text-[#6c6b6b]">
                  <a
                    key={index}
                    className="flex flex-row gap-3 items-center"
                    href={artist.external_urls.spotify}
                    target="_blank">
                    <span>{index + 1}. </span>
                    <Image
                      src={artist.images[0].url}
                      alt="profilePicture"
                      width={50}
                      height={10}
                      className="border rounded-full"
                    />
                    {artist.name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopItems;
