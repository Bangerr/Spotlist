import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// const getAccessToken = async () => {
//   const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${Buffer.from(
//         `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
//       ).toString("base64")}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       grant_type: "refresh_token",
//       refresh_token,
//     }),
//   });

//   return response.json();
// };

export const getPlaylist = async (playlist_id: string) => {
  const session = await getServerSession(authOptions);

  const access_token = session?.token?.access_token;

  return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTrack = async (trackId: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return console.error("Session not found or user not signed in.");
  }

  const access_token = session?.token?.access_token;
  const expires_at = session?.token?.expires_at;
  const readableExpiry = new Date(expires_at * 1000).toLocaleString();
  console.log("Readable: ", readableExpiry);

  return fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=ES`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return console.error("Session not found or user not signed in.");
  }

  const access_token = session?.token?.access_token;
  const expires_at = session?.token?.expires_at;
  const readableExpiry = new Date(expires_at * 1000).toLocaleString();
  console.log("Readable: ", readableExpiry);

  return fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const getTopArtists = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return console.error("Session not found or user not signed in.");
  }

  const access_token = session?.token?.access_token;
  const expires_at = session?.token?.expires_at;
  const readableExpiry = new Date(expires_at * 1000).toLocaleString();
  console.log("Readable: ", readableExpiry);

  return fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const customGet = async (url: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return console.error("Session not found or user not signed in.");
  }

  const access_token = session?.token?.access_token;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
