export function parseISOStringToDate(s: string) {
  const b: any[] = s.split(/\D+/);
  return new Date(Date.UTC(b[0], b[1], b[2], b[3], b[4], b[5], b[6]));
}

export function parseDateToISOString(date: Date) {
  return date.toISOString();
}

export function getTimeZoneInfoDisplayName() {
  return new Date().toString().split(' ')[5];
}
