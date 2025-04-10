import { DefaultSession } from "next-auth";

interface MyUser {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  image?: string | null;
  accessToken?: string | null;
}

export interface MySession extends Omit<DefaultSession, "user"> {
  user?: MyUser;
  expires: string;
}

interface Image {
  height?: number | null;
  url: string;
  width?: number | null;
}

export interface Album {
  id: string;
  name: string;
  artists: [Artist]; // tuple with exactly one lement
  images: Image[];
  album_type?: string;
  release_date?: string;
  tracks?: {
    total: number;
    items: Track[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  followers?: {
    total: number;
  };
  genres?: [string];
  external_urls: { spotify: string };
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: [Artist];
  duration_ms: number;
  external_urls: { spotify: string };
}

// Future integration
export interface PlaylistType {
  description?: string;
  id: string;
  followers?: {
    total?: number;
  };
  images?: [Image];
  name: string;
  owner?: {
    id: string;
    display_name?: string;
  };
  items?: [{ added_at: string; track: Track }];
  tracks?: {
    items?: [{ added_at: string; track: Track }];
    total: number;
  };
  type?: string;
  total?: number;
}

export interface ProfileData {
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
  followers: { total: number };
}
