import dayjs, { Dayjs } from "dayjs";
import { ScrollArea, Typography } from "ingred-ui";
import { FC, useMemo, useRef } from "react";
import { HEIGHT, weekList } from "../constants";
import {
  Container,
  CalendarContainer,
  DatePickerContainer,
  DayStyle,
} from "../styled";
import { useScroll } from "../hooks/useScroll";
import { Day } from "./internal/Day";

type Props = {
  date: Dayjs;
  onDateChange?: (date: Dayjs) => void;
};

/**
 * DatePicker
 * Scrollable calendar UI.
 * Currently, one year from the currently selected date is displayed.
 * @todo forwardRef
 */
export const DatePicker: FC<Props> = ({ date, onDateChange }) => {
  const vdate = useMemo(() => date.clone(), [date]);
  const dayOfWeek = useMemo(() => vdate.startOf("month").day(), [vdate]);
  const daysList = useMemo(
    () => Array.from(new Array(vdate.daysInMonth()), (_, i) => i + 1),
    [vdate]
  );

  const ref = useRef<HTMLDivElement>(null);
  const { monthList } = useScroll(vdate, ref);

  return (
    <Container>
      <ScrollArea ref={ref} minHeight={HEIGHT} maxHeight={HEIGHT} id="calendar">
        <>
          {monthList.map((m) => (
            <DatePickerContainer
              key={m.format("YYYY-MM")}
              id={m.format("YYYY-MM")}
            >
              <Typography align="center" component="h1" weight="bold">
                {m.format("YYYY年MM月")}
              </Typography>
              <CalendarContainer>
                {weekList["ja"].map((week) => (
                  <DayStyle key={week}>{week}</DayStyle>
                ))}

                {Array.from(new Array(dayOfWeek), (_, i) => (
                  <DayStyle key={i} />
                ))}
                {daysList.map((day) => (
                  <DayStyle key={day}>
                    <Day
                      key={day}
                      value={dayjs(new Date(m.year(), m.month(), day))}
                      selected={
                        // string compare
                        vdate.format("YYYY-MM-DD") ===
                        dayjs(new Date(m.year(), m.month(), day)).format(
                          "YYYY-MM-DD"
                        )
                      }
                      onClickDate={onDateChange}
                    >
                      {day}
                    </Day>
                  </DayStyle>
                ))}
              </CalendarContainer>
            </DatePickerContainer>
          ))}
        </>
      </ScrollArea>
    </Container>
  );
};
