import * as chrono from "chrono-node";
import moment from "moment-timezone";

export function formatDateAndTime(inputText: string, timezone: string) {
  const parsedDate = chrono.parseDate(inputText);
  const parsedResult = chrono.parse(inputText);
  let output;

  if (parsedResult.length === 0) {
    return "No valid date and time found in input text.";
  }

  if (parsedDate) {
    const localDate = parsedDate && new Date(parsedDate);

    const localFormattedDate = moment(localDate).format(
      "YYYY-MM-DD hh:mm:ss A"
    );
    const momentDate = moment.tz(localDate, timezone);
    const formattedDate = momentDate.format("(Z)");

    output = `${localFormattedDate} ${formattedDate}`;
  } else {
    output = "No valid date and time found in input text.";
  }

  return output;
}
