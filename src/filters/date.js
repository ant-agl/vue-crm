export default function date(date, format = "date") {
  let options = {};
  if (format.includes("date")) {
    options.day = "2-digit";
    options.month = "long";
    options.year = "numeric";
  }
  if (format.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }
  return Intl.DateTimeFormat("ru", options).format(date);
}
