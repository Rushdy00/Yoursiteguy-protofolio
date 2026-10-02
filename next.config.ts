import type { NextConfig } from "next";

// Static export: the page has no server-side data, so it can be hosted anywhere.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /ar/ → out/ar/index.html, works on any static host
  images: { unoptimized: true },
};

export default nextConfig;
