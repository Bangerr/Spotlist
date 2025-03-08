"use client";
import { useSession } from "next-auth/react";
import Login from "./login/page";
import { ChartConfig } from "@/components/ui/chart";
import VibeChecker from "@/components/VibeChecker";
import TrackDetails from "@/components/TrackDetails";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const chartData = [
  { vibe: "Danceability", value: 85 },
  { vibe: "Energy", value: 90 },
  { vibe: "Speechiness", value: 35 },
  { vibe: "Acousticness", value: -15.0 },
  { vibe: "Valence", value: 70 },
];

export default function Home() {
  const session = useSession();

  if (!session || session.status !== "authenticated") {
    console.log("Entered");
    return <Login />;
  }

  return (
    <main className="w-full px-10 md:w-[30%] mx-auto h-full">
      {/* Vibe checker */}
      <div className="mt-20">
        <VibeChecker chartData={chartData} />
        <TrackDetails />
      </div>
    </main>
  );
}
