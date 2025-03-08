import { getLyrics } from "@/lib/musixmatch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const isrc_ids = await req.json();

    console.log(isrc_ids[0]);

    if (!isrc_ids) {
      return NextResponse.json(
        { error: "Missing track_isrc" },
        { status: 400 }
      );
    }
    console.log("Entered POST request");
    const lyricsResponse = await fetch(
      `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=${process.env.MUSIXMATCH_API_KEY}&track_isrc=${isrc_ids[0]}`
    );

    if (!lyricsResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch lyrics" },
        { status: lyricsResponse.status }
      );
    }

    //console.log(lyricsResponse);

    const trackData = await lyricsResponse.json();

    return new Response(JSON.stringify(trackData), {
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
