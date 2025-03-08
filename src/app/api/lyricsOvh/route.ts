import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { artist, title } = await req.json();

    console.log(artist, title);

    if (!title && !artist) {
      return NextResponse.json(
        { error: "Missing title or artist" },
        { status: 400 }
      );
    }
    console.log("Entered POST request");
    const lyricsResponse = await fetch(
      `https://api.lyrics.ovh/v1/${artist}/${title}`
    );

    if (!lyricsResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch lyrics" },
        { status: lyricsResponse.status }
      );
    }

    //console.log(lyricsResponse);

    const lyrics = await lyricsResponse.json();

    return new Response(JSON.stringify(lyrics), {
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
