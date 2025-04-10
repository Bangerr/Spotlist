import { customGet } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const profileResponse = await customGet("https://api.spotify.com/v1/me");

    if (!profileResponse) {
      return NextResponse.json({ error: "Failed to fetch Profile Data" });
    }

    const profileData = await profileResponse.json();

    return NextResponse.json(profileData, {
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
