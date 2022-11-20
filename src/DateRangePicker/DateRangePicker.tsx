import dayjs, { Dayjs } from "dayjs";
// import "dayjs/plugin/isBetween";
import { ScrollArea, Typography } from "ingred-ui";
import { FC, useMemo, useRef, useState } from "react";
import { HEIGHT, weekList } from "../constants";
import {
  CalendarContainer,
  Container,
  DatePickerContainer,
  DayStyle,
} from "../styled";
import { useScroll } from "../hooks/useScroll";
import { Day } from "./internal/Day";

export type DateRange = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

type Props = {
  date: DateRange;
  onDateChange?: (date: DateRange) => void;
};

type ClickState = "start" | "end" | "none";

const isSelected = (
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

const isBetween = (
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

/**
 * DateRangePicker
 * Scrollable calendar UI.
 * Currently, one year from the currently selected date is displayed.
 * @todo forwardRef
 */
export const DateRangePicker: FC<Props> = ({ date, onDateChange }) => {
  const vdate = useMemo(
    () => ({
      startDate: date.startDate?.clone(),
      endDate: date.endDate?.clone(),
    }),
    []
  );

  const ref = useRef<HTMLDivElement>(null);
  const { monthList } = useScroll(vdate.startDate ?? dayjs(), ref);
  const [clickState, setClickState] = useState<ClickState>("start");

  return (
    <Container>
      <ScrollArea ref={ref} minHeight={HEIGHT} maxHeight={HEIGHT} id="calendar">
        <>
          {monthList.map((m) => (
            <DatePickerContainer
              key={m.format("YYYY-MM")}
              id={m.format("YYYY-MM")}
              className={m.format("YYYY-MM")}
            >
              <Typography align="center" component="h1" weight="bold">
                {m.format("YYYY年MM月")}
              </Typography>
              <CalendarContainer>
                {weekList["ja"].map((week) => (
                  <DayStyle key={week}>{week}</DayStyle>
                ))}

                {Array.from(new Array(m.startOf("month").day()), (_, i) => (
                  <DayStyle key={i} />
                ))}
                {Array.from(new Array(m.daysInMonth()), (_, i) => i + 1).map(
                  (day) => (
                    <DayStyle key={day}>
                      <Day
                        key={day}
                        value={dayjs(new Date(m.year(), m.month(), day))}
                        date={date}
                        selected={isSelected(date, m, day)}
                        isBetween={isBetween(date, m, day)}
                        clickState={clickState}
                        changeState={setClickState}
                        onClickDate={onDateChange}
                      >
                        {day}
                      </Day>
                    </DayStyle>
                  )
                )}
              </CalendarContainer>
            </DatePickerContainer>
          ))}
        </>
      </ScrollArea>
    </Container>
  );
};
