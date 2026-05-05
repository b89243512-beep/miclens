import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
