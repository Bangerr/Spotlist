import { getTopTracks } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Entered top Tracks");
  try {
    const topTracksResponse = await getTopTracks();

    // if (!topTracksResponse.ok) {
    //   return NextResponse.json(
    //     { error: "Failed to fetch track" },
    //     { status: topTracksResponse.status }
    //   );
    // }

    //const topTracksData = await topTracksResponse.json();

    return new Response(JSON.stringify(topTracksResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
