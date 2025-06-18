export const TWENTY_MINUTES_IN_MS = 20 * 60 * 1000;

export function isCacheExpired(cacheTimestamp: number): boolean {
  const currentTime = Date.now();
  const timeDifference = currentTime - cacheTimestamp;
  return timeDifference > TWENTY_MINUTES_IN_MS;
}
