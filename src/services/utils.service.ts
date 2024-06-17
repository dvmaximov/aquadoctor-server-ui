export const nowDateStr = () => {
  //2019-02-01 12:44
  const now = new Date();
  const date = dateToStr(now);
  return `${date}`;
};

export const nowTimeStr = () => {
  //2019-02-01 12:44
  const now = new Date();
  const time = timeToStr(now);
  return `${time}`;
};

export const dateTimeStrToDate = (dateTimeStr: string, isStamp = true) => {
  const dateTime = dateTimeStr.split(' ');
  const dateStr = dateTime[0];
  const timeStr = dateTime[1];
  const date = strToDate(dateStr);
  const parts = timeStr.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.getTime();
};

export const timeToStr = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let hoursStr = hours.toString();
  let minutesStr = minutes.toString();
  if (hours < 10) hoursStr = '0' + hoursStr;
  if (minutes < 10) minutesStr = '0' + minutesStr;
  return `${hoursStr}:${minutesStr}`;
};

export const dateToStr = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const yearStr = year.toString();
  let monthStr = month.toString();
  let dayStr = day.toString();
  if (month < 10) monthStr = '0' + monthStr;
  if (day < 10) dayStr = '0' + dayStr;
  return `${yearStr}-${monthStr}-${dayStr}`;
};

export const strToDate = (dateStr: string) => {
  const parts = dateStr.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);
  const date = new Date(year, month, day);
  return date;
};

export const strTimeToDate = (timeStr: string): Date => {
  const parts = timeStr.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};

export const isTimeBetween = (
  startTimeStr: string,
  endTimeStr: string
): boolean => {
  let result = false;
  const start = strTimeToDate(startTimeStr);
  const end = strTimeToDate(endTimeStr);
  const now = new Date();
  if (now >= start && now <= end) result = true;
  return result;
};

export const isTomorrowBetween = (
  startDateStr: string,
  endDateStr: string
): boolean => {
  let result = false;
  const start = strToDate(startDateStr);
  const end = strToDate(endDateStr);
  const now = new Date();
  now.setDate(now.getDate() + 1);
  if (now >= start && now <= end) result = true;
  return result;
};

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
