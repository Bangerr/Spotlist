"use client";
import { Artist, Track } from "@/types/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const TopItems = () => {
  const [topTracks, setTopTracks] = useState<Track[] | null>(null);
  const [topArtists, setTopArtists] = useState<Artist[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopItems() {
      setIsLoading(true);
      setError(null);
      try {
        const [tracksResponse, artistsResponse] = await Promise.all([
          fetch("/api/topTracks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }),
          fetch("/api/topArtists", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!tracksResponse.ok) {
          throw new Error(
            `Failed to fetch top Tracks (${tracksResponse.status})`
          );
        }
        if (!artistsResponse.ok) {
          throw new Error(
            `Failed to fetch top Artists (${artistsResponse.status})`
          );
        }

        const [tracksData, artistsData] = await Promise.all([
          tracksResponse.json(),
          artistsResponse.json(),
        ]);

        setTopTracks(tracksData.items);
        setTopArtists(artistsData.items);
      } catch (err: any) {
        console.error("Top items fetching failed:", err);
        setError(err.message || "Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopItems();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col text-gray-300 gap-5 justify-center items-center h-screen">
        Searching....
        <svg
          className="animate-spin h-10 w-10 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4.93 4.93a10 10 0 0114.14 14.14l-1.41-1.41a8 8 0 00-11.31-11.31L4.93 4.93z"></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 text-center text-red-500">
        <p>Could not load Spotify data: {error}</p>
        <p>Please try refreshing the page or logging in again.</p>
      </div>
    );
  }

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
      <div className="flex md:flex-row flex-col gap-5">
        {/* Top Tracks */}
        <div className="basis-1/2 bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl text-gray-800 dark:text-gray-500 font-bold mb-6">
            Top Tracks
          </h2>
          <div className="flex flex-col gap-5 ">
            {topTracks?.map((track, index) => (
              <a
                key={index}
                className="flex flex-row gap-3 items-center p-3 rounded-xl hover:text-green-500
                hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
                href={track.external_urls.spotify}
                target="_blank">
                <span className="text-gray-500">{index + 1}. </span>

                <Image
                  src={track.album.images[0].url}
                  alt="profilePicture"
                  width={50}
                  height={50}
                  className="border rounded-lg object-cover"
                />
                <div className="">
                  <h3 className="text-gray-800 dark:text-gray-200">
                    {track.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Top Artists */}
        <div className="basis-1/2 bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl text-gray-800 dark:text-gray-500 font-bold mb-6">
            Top Artits
          </h2>
          <div className="flex flex-col gap-5">
            {topArtists?.map((artist, index) => (
              <a
                key={index}
                className="flex flex-row gap-3 items-center p-3 rounded-xl hover:text-green-500
                hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
                href={artist.external_urls.spotify}
                target="_blank">
                <span className="text-gray-500">{index + 1}. </span>
                <Image
                  src={artist.images[0].url}
                  alt="profilePicture"
                  width={50}
                  height={10}
                  className="border rounded-lg object-cover"
                />
                <div className="">
                  <h3 className="text-gray-800 dark:text-gray-200">
                    {artist.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {artist.genres?.slice(0, 2).join(", ")}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopItems;
