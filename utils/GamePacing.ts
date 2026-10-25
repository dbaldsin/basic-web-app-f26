// Temporary pacing requested during the live game. Automatically expires.
const pacingEndsAt = Date.parse("2026-10-25T13:56:30Z");

export default function shouldSkipForPacing(query: string, now = Date.now()): boolean {
  if (now >= pacingEndsAt) return false;
  if (!/\bplus\b|\blargest\b/i.test(query)) return false;
  let hash = 0;
  for (let i = 0; i < query.length; i++) hash = (Math.imul(hash, 31) + query.charCodeAt(i)) | 0;
  return (hash >>> 0) % 4 === 0;
}
