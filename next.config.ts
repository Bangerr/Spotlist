import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/ab6775700000ee851dedbc29273f68c5d61947cf",
        search: "",
      },
    ],
  },
};

export default nextConfig;
