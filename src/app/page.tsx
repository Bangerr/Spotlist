"use client";
import { useSession } from "next-auth/react";
import Login from "./login/page";
import { ChartConfig } from "@/components/ui/chart";
import VibeChecker from "@/components/VibeChecker";
import TrackDetails from "@/components/TrackDetails";
import TopItems from "@/components/TopItems";

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
    <main className="w-full px-8 lg:w-[50%] md:w-[75%] mx-auto h-full">
      <div className="w-full mx-auto flex justify-center mt-16">
        <p className="text-[#52525b] text-[1.1rem] font-semibold">
          This app repesents the data from the last 6 Months.
        </p>
      </div>
      {/* Vibe checker */}
      <div className="mt-20">
        {/* <VibeChecker chartData={chartData} /> */}
        {/* <TrackDetails /> */}
        <TopItems />
      </div>
    </main>
  );
}
