import type { Thing, WithContext } from "schema-dts";

export type { WithContext };

export function safeJsonLd(data: WithContext<Thing>): string {
  return JSON.stringify(data)
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/&/g, "&")
    .replace(/'/g, "'");
}
