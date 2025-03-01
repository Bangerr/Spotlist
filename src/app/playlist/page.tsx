"use client";
import React, { useEffect, useState } from "react";

export default function Playlist() {
  const [trackData, setTrackData] = useState();
  const trackId = "7ycWLEP1GsNjVvcjawXz3z?si=23904013924b4668";

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await fetch("/api/playlists", {
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
        } else {
          throw new Error("Failed to fetch the Playlist.");
        }
      } catch (err) {
        console.error("Playlist fetching failed Step: ", err);
      }
    }
    fetchPlaylist();
  }, []);

  return (
    <div className="w-full px-10 md:w-[30%] mx-auto mt-16">
      <div>{/* <p>Album Name: {trackData.artists[0].name}</p> */}</div>

      {/* Track Card */}
      <div>fe</div>
    </div>
  );
}
