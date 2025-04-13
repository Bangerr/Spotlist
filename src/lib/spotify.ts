import { AuthUser } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";

const getAccessToken = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return console.error("Session not found or user not signed in.");
  }

  const user = session.user as AuthUser;
  return user.access_token;
};

export const getTopTracks = async () => {
  const access_token = await getAccessToken();

  const topTracks = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return topTracks;
};

export const getTopArtists = async () => {
  const access_token = await getAccessToken();
  console.log("Access token:", access_token);

  const topArtists = fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return topArtists;
};

export const getPlaylist = async (playlist_id: string) => {
  const access_token = await getAccessToken();

  return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTrack = async (trackId: string) => {
  const access_token = await getAccessToken();

  return fetch(`https://api.spotify.com/v1/tracks/${trackId}?market=ES`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const customGet = async (url: string) => {
  const access_token = await getAccessToken();

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
