import * as chrono from "chrono-node";
import moment from "moment-timezone";

export function formatDateAndTime(inputText: string, timezone: string) {
  const parsedDate = chrono.parseDate(inputText, {
    timezone: moment().tz(timezone).format("z"),
  });
  const parsedResult = chrono.parse(inputText);
  let output;

  if (parsedResult.length === 0) {
    return "No valid date and time found in input text.";
  }

  if (parsedDate) {
    const momentDate = moment.tz(parsedDate, timezone);
    const formattedDate = momentDate.format("YYYY-MM-DD hh:mm:ss A (Z)");

    output = `${formattedDate}`;
  } else {
    output = "No valid date and time found in input text.";
  }

  return output;
}
