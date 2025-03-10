import { getTopArtists } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Entered top Artists");
  try {
    const mistralResponse = await getTopArtists();

    const mistralData = await mistralResponse.json();

    return new Response(JSON.stringify(mistralData), {
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
