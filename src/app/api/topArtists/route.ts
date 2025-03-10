import { getTopArtists } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Entered top Artists");
  try {
    const topArstitsResponse = await getTopArtists();

    if (!topArstitsResponse) {
      return NextResponse.json({ error: "Failed to fetch artists" });
    }

    const topArtistsData = await topArstitsResponse.json();

    return NextResponse.json(topArtistsData, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
