/**
 * 
 * @param s is string ISODatetime
 */
export function parseISOStringToDate(s: string) {
  const b: string[] = s.split(/\D+/);
  try {
    return new Date(Date.UTC(
      parseInt(b[0], 10),
      parseInt(b[1], 10),
      parseInt(b[2], 10),
      parseInt(b[3], 10),
      parseInt(b[4], 10),
      parseInt(b[5], 10),
      parseInt(b[6], 10))
    );
  } catch (e) {
    throw 'date not format ISO Datetime!';
  }
}

/**
 * 
 * @param date is Datetime
 */
export function parseDateToISOString(date: Date) {
  return date.toISOString();
}

export function getTimeZoneInfoDisplayName() {
  return new Date().toString().split(' ')[5];
}
