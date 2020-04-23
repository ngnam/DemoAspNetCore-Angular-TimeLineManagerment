/**
 *
 * @param s is string ISODatetime
 */
export function parseISOStringToDate(s: string) {
  const b: string[] = s.split(/\D+/);
  try {
    return new Date(
      Date.UTC(
        parseInt(b[0], 10),
        parseInt(b[1], 10),
        parseInt(b[2], 10),
        parseInt(b[3], 10),
        parseInt(b[4], 10),
        parseInt(b[5], 10),
        parseInt(b[6], 10)
      )
    );
  } catch (e) {
    throw new Error('date not format ISO Datetime!');
  }
}

export function getTimeZoneInfoDisplayName() {
  return new Date().toString().split(' ')[5];
}

export function toTimestamp(strDate: string): number {
  try {
    const datum = Date.parse(strDate);
    return datum / 1000;
  } catch {
    throw new Error('date not format');
  }
}

export function fromTimestamp(unixTime: number) {
  return new Date(unixTime * 1000);
}

export function toTimestampFromDate(d: Date) {
  return Math.round(d.getTime() / 1000);
}
