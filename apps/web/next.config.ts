import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
