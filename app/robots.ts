import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "Google-Extended", "ClaudeBot", "PerplexityBot", "anthropic-ai"],
        allow: "/",
      },
    ],
    sitemap: "https://divingclub.lk/sitemap.xml",
  };
}
