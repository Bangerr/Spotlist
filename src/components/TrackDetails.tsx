"use client";
import React, { useEffect, useState } from "react";

interface TrackName_Artist {
  artist: string;
  name: string;
}

interface TrackDetails {
  track: TrackName_Artist[];
}

const TrackDetails = () => {
  const [trackData, setTrackData] = useState({});
  const [isrc_ids, setIsrc_ids] = useState<string[]>([]);
  const [track_lyrics, setTrack_lyrics] = useState<string[]>([]);
  const trackId = "2plbrEY59IikOBgBGLjaoe?si=9962ca09330f464a";
  const [title, setTitle] = useState<string[]>([]);
  const [artist, setArtist] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTrack() {
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
          setTitle((prevState) => [...prevState, data.name]);
          setArtist((prevState) => [...prevState, data.artists[0].name]);
        } else {
          throw new Error("Failed to fetch the Track.");
        }
      } catch (err) {
        console.error("Playlist fetching failed Step: ", err);
      }
    }

    fetchTrack();
  }, []);

  useEffect(() => {
    async function fetchLyrics() {
      try {
        const response = await fetch("/api/lyricsOvh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ artist, title }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          //musixwatch lyrics
          // const { lyrics } = data.message.body;
          // console.log("Lyrics: ", lyrics.lyrics_body);
          setTrack_lyrics(data.lyrics);
        } else {
          throw new Error("Failed to fetch the Lyrics.");
        }
      } catch (err) {
        console.error("Playlist fetching failed Step: ", err);
      }
    }
    fetchLyrics();
  }, [title]);

  return (
    <div>
      {isrc_ids ? (
        <div className="flex flex-col">
          <div>ISRC: {isrc_ids[0]}</div>

          <div>Title: {title}</div>
          <div>Artist: {artist}</div>
          {/* <div>Lyrics: {track_lyrics}</div> */}
        </div>
      ) : (
        <div>Loading external IDS...</div>
      )}
    </div>
  );
};

export default TrackDetails;
