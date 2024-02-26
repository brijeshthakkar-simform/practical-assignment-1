import * as chrono from "chrono-node";
import moment from "moment-timezone";

// export function formatDateAndTime(inputText: string) {
//   const parsedResult = chrono.parse(inputText);

//   if (parsedResult.length === 0) {
//     return "No valid date and time found in input text.";
//   }

//   const parsedDate = parsedResult[0].start.date();

//   // Format the date and time
//   const formattedDateTime = parsedDate.toLocaleString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//   });

//   // Get the offset in hours and minutes
//   const offsetHours = Math.floor(parsedDate.getTimezoneOffset() / 60);
//   const offsetMinutes = Math.abs(parsedDate.getTimezoneOffset() % 60);

//   // Construct the offset string (+/-HH:MM)
//   const offsetString = `${offsetHours >= 0 ? "+" : "-"}${Math.abs(offsetHours)
//     .toString()
//     .padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`;

//   // Construct the final output string
//   const output = `${formattedDateTime} (${offsetString})`;

//   return output;
// }

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
