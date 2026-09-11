import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 3840 dropped from Next's defaults: no source asset on the site is wider than 3024px, so
    // that candidate could only ever be a wasted re-encode and a second cache entry for the
    // same pixels. Each page's `sizes` is what actually picks the width; this is the backstop.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
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
