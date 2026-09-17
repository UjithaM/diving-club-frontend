/** "8–22 m" → [8, 22]. Anything written differently returns null, and callers draw no bar. */
export function parseDepth(depth: string): [number, number] | null {
  const m = depth.match(/(\d+(?:\.\d+)?)\s*[–—-]\s*(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return a < b ? [a, b] : [b, a];
}
