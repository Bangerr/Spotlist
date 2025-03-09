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
          //console.log(data);
          const { items } = data;
          console.log("Top Tracks: ", items[0].album.images[0]);

          setTopTracks(items);
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
          //console.log(data);
          const { items } = data;
          console.log("Top Artits: ", items);
          setTopArtists(items);
        } else {
          throw new Error("Failed to fetch top artists.");
        }
      } catch (err) {
        console.error("Top artists fetching failed Step: ", err);
      }
    }

    fetchTopArtists();
  }, []);

  // console.log("Top Tracks: ", topTracks);
  // console.log("Top Artist: ", topArtists);

  const maxRows = Math.max(topTracks?.length ?? 0, topArtists?.length ?? 0);

  return (
    <div>
      <div className="flex flex-row justify-between gap-10 w-full p-10 border rounded-2xl my-16 bg-secondary">
        {/* Top Artists */}
        <div className="w-1/2">
          Top Artists:
          <div className="flex flex-col gap-2">
            {topArtists?.map((artist, index) => (
              <div key={index} className="flex flex-row gap-4">
                <span className="">{index + 1}</span>
                <Image
                  src={artist.images[0].url}
                  alt="profilePicture"
                  width={50}
                  height={10}
                  className="border rounded-full"
                />
                <a href={artist.external_urls.spotify} target="_blank">
                  {artist.name}
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* Top Tracks */}
        <div className="w-1/2">
          <h2 className="text-lg font-bold ">Top Tracks:</h2>
          {topTracks !== null || topTracks !== undefined ? (
            <div className="flex flex-col gap-2">
              {topTracks?.map((track, index) => (
                <div key={index} className="flex flex-row gap-4">
                  <span className="">{index + 1}</span>
                  <Image
                    src={track.album.images[0].url}
                    alt="profilePicture"
                    width={50}
                    height={50}
                    className="border rounded-full"
                  />
                  <a href={track.external_urls.spotify} target="_blank">
                    {track.name}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div>Not found</div>
          )}
        </div>
      </div>

      <div className="bg-secondary border border-black dark:border-primary rounded-3xl p-10">
        <table className="min-w-full px-10">
          <thead className="border-b border-b-black dark:border-primary">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-[#d6cfcf] font-medium">
                Top Tracks
              </th>
              <th className="px-6 py-3 text-left text-gray-700 dark:text-[#d6cfcf] font-medium">
                Top Artists
              </th>
            </tr>
          </thead>

          <tbody className="w-full">
            {Array.from({ length: maxRows }).map((_, i) => (
              <tr key={i} className=" ">
                <td className="w-1/2 px-6 py-3 text-[#424242] dark:text-[#a19a9a] font-medium hover:text-[#a19a9a] dark:hover:text-[#6c6b6b]">
                  {topTracks && topTracks[i] ? (
                    <a
                      key={i}
                      className="flex flex-row gap-3 items-center"
                      href={topTracks[i].external_urls.spotify}
                      target="_blank">
                      <span>{i + 1}. </span>
                      <Image
                        src={topTracks[i].album.images[0].url}
                        alt="profilePicture"
                        width={50}
                        height={50}
                        className="border rounded-full"
                      />
                      {topTracks[i].name}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="w-1/2 px-6 py-3 text-[#424242] dark:text-[#a19a9a] font-medium hover:text-[#a19a9a] dark:hover:text-[#6c6b6b]">
                  {topArtists && topArtists[i] ? (
                    <a
                      key={i}
                      className="flex flex-row gap-3 items-center"
                      href={topArtists[i].external_urls.spotify}
                      target="_blank">
                      <span>{i + 1}. </span>
                      <Image
                        src={topArtists[i].images[0].url}
                        alt="profilePicture"
                        width={50}
                        height={10}
                        className="border rounded-full"
                      />
                      {topArtists[i].name}
                    </a>
                  ) : (
                    "-"
                  )}
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
