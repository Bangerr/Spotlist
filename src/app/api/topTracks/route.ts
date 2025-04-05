import { getTopTracks } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const topTracksResponse = await getTopTracks();

    if (!topTracksResponse) {
      return NextResponse.json({ error: "Failed to fetch track" });
    }

    const topTracksData = await topTracksResponse.json();

    return NextResponse.json(topTracksData, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
