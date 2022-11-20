import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "./types";

export const isSelected = (
  { startDate, endDate }: DateRange,
  month: Dayjs,
  day: number
) =>
  startDate?.format("YYYY-MM-DD") ===
    dayjs(new Date(month.year(), month.month(), day)).format("YYYY-MM-DD") ||
  endDate?.format("YYYY-MM-DD") ===
    dayjs(new Date(month.year(), month.month(), day)).format("YYYY-MM-DD");

// isBetween is not working using vite development server. I don't know why.
// Instead, I define function myself to check if the date is between start and end date.
// const isBetween = (
//   { startDate, endDate }: DateRange,
//   month: Dayjs,
//   day: number
// ) =>
//   (startDate &&
//     endDate &&
//     dayjs(new Date(month.year(), month.month(), day)).isBetween(
//       startDate.format("YYYY-MM-DD"),
//       endDate.format("YYYY-MM-DD"),
//       "day",
//       "[]"
//     )) ??
//   false;

export const isBetween = (
  { startDate, endDate }: DateRange,
  month: Dayjs,
  day: number
) =>
  (startDate &&
    endDate &&
    dayjs(new Date(month.year(), month.month(), day)).isAfter(
      startDate.format("YYYY-MM-DD"),
      "day"
    ) &&
    dayjs(new Date(month.year(), month.month(), day)).isBefore(
      endDate.format("YYYY-MM-DD"),
      "day"
    )) ??
  false;
