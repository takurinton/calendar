import { Dayjs } from "dayjs";
import { FC, memo, ReactNode } from "react";
import { DayContainer } from "./styled";

type DateRange = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

type Props = {
  selected: boolean;
  isBetween: boolean;
  value: Dayjs;
  date: DateRange;
  clickState: "start" | "end" | "none";
  changeState: (newState: "start" | "end" | "none") => void;
  onClickDate?: (newDate: DateRange) => void;
  children: ReactNode;
};

export const Day: FC<Props> = memo(
  ({
    selected,
    isBetween,
    date,
    value,
    clickState,
    changeState,
    onClickDate,
    children,
  }) => (
    <DayContainer
      selected={selected}
      isBetween={isBetween}
      // How can I improve the User Experience?
      // Answer: impossible
      onClick={() => {
        if (clickState === "start") {
          if (value.isAfter(date.endDate)) {
            onClickDate?.({
              startDate: date.endDate,
              endDate: value,
            });
          } else {
            onClickDate?.({
              startDate: value,
              endDate: date.endDate,
            });
          }
          changeState("end");
        } else if (clickState === "end") {
          if (value.isBefore(date.startDate)) {
            onClickDate?.({ startDate: value, endDate: date.startDate });
          } else {
            onClickDate?.({ startDate: date.startDate, endDate: value });
          }
          changeState("start");
        }
      }}
    >
      {children}
    </DayContainer>
  )
);
