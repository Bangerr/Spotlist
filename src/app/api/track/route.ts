import { getTrack } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { trackId } = await req.json();

    if (!trackId) {
      return NextResponse.json({ error: "Missing trackId" }, { status: 400 });
    }

    const trackResponse = await getTrack(trackId);

    if (!trackResponse) {
      return NextResponse.json({ error: "Failed to fetch track" });
    }

    const trackData = await trackResponse.json();

    return NextResponse.json(trackData, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  //const track = await getTrack(playlistId);

  //return NextResponse.json(track, { status: 200 });
}
