"use client";
import React, { useEffect, useState } from "react";

export default function Track() {
  const [trackData, setTrackData] = useState({});
  const [isrc_ids, setIsrc_ids] = useState<string[]>([]);
  const trackId = "7ycWLEP1GsNjVvcjawXz3z?si=23904013924b4668";

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trackId }),
        });

        if (response.ok) {
          const data = await response.json();

          console.log(data);
          setTrackData(data);
          const { external_ids } = data;
          setIsrc_ids((prevIsrcIds) => [...prevIsrcIds, external_ids.isrc]);
          console.log(isrc_ids);
        } else {
          throw new Error("Failed to fetch the Track.");
        }
      } catch (err) {
        console.error("Playlist fetching failed Step: ", err);
      }
    }
    fetchPlaylist();
  }, []);

  return (
    <div className="w-full px-10 md:w-[30%] mx-auto mt-16">
      {isrc_ids ? (
        <div>ISRC: {isrc_ids}</div>
      ) : (
        <div>Loading external IDS...</div>
      )}
    </div>
  );
}
