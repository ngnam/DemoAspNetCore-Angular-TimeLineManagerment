/**
 * namnv39
 * 0349801673
 * nguyen.van.nam@outlook.com
 * day: 24/4/2020
 */
const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

/**
 * Parse string DateISO to DateTimeUTC
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

/**
 * get timezone Display Name
 */
export function getTimeZoneInfoDisplayName() {
  return new Date().toString().split(' ')[5];
}

/**
 * convert strDate to timestamp
 * @param strDate string
 */
export function toTimestamp(strDate: string): number {
  try {
    const datum = Date.parse(strDate);
    return datum / 1000;
  } catch {
    throw new Error('date not format');
  }
}

/**
 * convert unixTimestamp to DateTime
 * @param unixTime number
 */
export function fromTimestamp(unixTime: number) {
  return new Date(unixTime * 1000);
}

/**
 * Convert Date to unixTimeStamp
 * @param d Date
 */
export function toTimestampFromDate(d: Date) {
  return Math.round(d.getTime() / 1000);
}

/**
 * get Date string with format from DateTime
 * @param dateTime Date
 * @param format is string format date
 */
export function toDateFormat(dateTime: Date, format?: 'yyyy-mm-dd' | 'yyyy-dd-mm' | 'dd/mm/yyyy' | 'mm/dd/yyyy') {
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  let result = '';

  if (!format) {
    format = 'yyyy-mm-dd';
  }
  switch (format) {
    case 'yyyy-mm-dd':
      result = `${year}-${pad(month)}-${pad(date)}`;
      break;
    case 'yyyy-dd-mm':
      result = `${year}-${pad(date)}-${pad(month)}`;
      break;
    case 'dd/mm/yyyy':
      result = `${pad(date)}/${pad(month)}/${year}`;
      break;
    case 'mm/dd/yyyy':
      result = `${pad(month)}/${pad(date)}/${year}`;
      break;
  }
  return result;
}

/**
 * get Time string with format time from DateTime
 * @param dateTime Date
 * @param format is string format date
 */
export function toTimeFormat(dateTime: Date, format?: 'HH:mm:ss' | 'HH:mm') {
  const hours = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();
  let result = '';

  if (!format) {
    format = 'HH:mm:ss';
  }
  switch (format) {
    case 'HH:mm:ss':
      result = `${pad(hours)}:${pad(minute)}:${pad(second)}`;
      break;
    case 'HH:mm':
      result = `${pad(hours)}:${pad(minute)}`;
      break;
  }

  return result;
}

function getExtension(filename: string) {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}

export function isImage(filename: string) {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
    // etc
    return true;
  }
  return false;
}

export function isVideo(filename: string) {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
    // etc
    return true;
  }
  return false;
}

export function CheckFileSize(file: File, sizeLimit?: number) {
  if (!sizeLimit) { sizeLimit = 10; }
  const fileSize = file.size / 1024 / 1024; // in MB
  if (fileSize > sizeLimit) {
    alert('File size exceeds 2 MB');
    return false;
  }
  return true;
}

export function timeSince(date: Date) {

  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + ' years';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}
