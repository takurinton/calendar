import { Dayjs } from "dayjs";

export type DateRange = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

export type ClickState = "start" | "end";
