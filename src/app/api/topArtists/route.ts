import { getTopArtists } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Entered top Artists");
  try {
    const topArstitsResponse = await getTopArtists();

    // if (!topArstitsResponse.ok) {
    //   return NextResponse.json(
    //     { error: "Failed to fetch artists" },
    //     { status: topArstitsResponse.status }
    //   );
    // }

    //const topArtistsData = await topArstitsResponse.json();

    return new Response(JSON.stringify(topArstitsResponse), {
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
