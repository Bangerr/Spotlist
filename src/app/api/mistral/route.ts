import { getTopArtists } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const mistralResponse = await getTopArtists();

    if (!mistralResponse) {
      return NextResponse.json({ error: "Failed to fetch mistral analysis." });
    }

    const mistralData = await mistralResponse.json();

    return NextResponse.json(mistralData, {
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
