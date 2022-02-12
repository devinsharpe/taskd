import { format, parse } from "date-fns";

const dateTimeFormatString = "yyyy-MM-dd'T'HH:mm";

const formatDateTime = (date: Date) => {
  return format(date, dateTimeFormatString);
};

const parseDateTime = (dateTimeString: string) => {
  return parse(dateTimeString, dateTimeFormatString, new Date());
};

export { formatDateTime, parseDateTime, dateTimeFormatString };
