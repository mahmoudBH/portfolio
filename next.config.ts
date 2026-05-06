import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // يسمح بتحميل أي صورة من هذا النطاق
      },
    ],
  },
};

export default nextConfig;