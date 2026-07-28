"use client";

import { usePathname } from "next/navigation";

// Ad landing pages that render bare: no header, no footer, no FAB.
const BARE_ROUTES = new Set(["/dive", "/padi"]);

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return BARE_ROUTES.has(usePathname()) ? null : <>{children}</>;
}
