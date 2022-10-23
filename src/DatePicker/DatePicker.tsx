import { FC } from "react";
import dayjs, { Dayjs } from "dayjs";
import { weekList } from "./constants";
import { Container, DatePickerContainer, DayStyle } from "./styled";
import { Day } from "./intrenal";
import { Typography } from "ingred-ui";

type Props = {
  date?: Dayjs;
  vdate: Dayjs;
  onDateChange?: (date: Dayjs) => void;
};

/**
 * DatePicker UI
 * Component for displaying a stand-alone calendar.
 * Calculates the first day of the month and displays the calendar in grid.
 * Sunday is the start.
 */
export const DatePicker: FC<Props> = ({
  date = dayjs(),
  vdate,
  onDateChange,
}) => {
  const dayOfWeek = (date.startOf("month").day() + 7) % 7;
  const daysList = Array.from(new Array(date.daysInMonth()), (_, i) => i + 1);

  return (
    <Container>
      <Typography align="center" component="h1" weight="bold">
        {date.format("YYYY年MM月")}
      </Typography>
      <DatePickerContainer>
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
              value={dayjs(new Date(date.year(), date.month(), day))}
              selected={
                // string compare
                vdate.format("YYYY-MM-DD") ===
                dayjs(new Date(date.year(), date.month(), day)).format(
                  "YYYY-MM-DD"
                )
              }
              onClickDate={onDateChange}
            >
              {day}
            </Day>
          </DayStyle>
        ))}
      </DatePickerContainer>
    </Container>
  );
};
