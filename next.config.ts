import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8000" },
      { protocol: "https", hostname: "admin.divingclub.lk" },
    ],
  },
  // nginx serves www and apex identically; consolidate on the apex with a 301
  // rather than relying on the canonical tag alone.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.divingclub.lk" }],
        destination: "https://divingclub.lk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
