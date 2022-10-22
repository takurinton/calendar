import { FC, useCallback, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { weekList } from "./constants";
import { Container, DatePickerContainer, DayStyle } from "./styled";
import { Day } from "./intrenal";
import { Typography } from "ingred-ui";

type Props = {
  date?: Dayjs;
  onDateChange?: (date: Dayjs) => void;
};

/**
 * @todo view calendar ui
 * @todo select date
 * @todo update date
 */
export const DatePicker: FC<Props> = ({ date = dayjs(), onDateChange }) => {
  const daysList = Array.from(new Array(date.daysInMonth()), (_, i) => i + 1);
  const dayOfWeek = (date.startOf("month").day() + 7) % 7;

  const handleDateChange = useCallback(
    (newDay: Dayjs) => {
      onDateChange?.(newDay);
    },
    [onDateChange]
  );

  return (
    <Container>
      <Typography align="center" component="h1" weight="bold">
        {date.format("MM月")}
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
              value={day}
              onClickDate={handleDateChange}
              selected={date.date() === day}
            >
              {day}
            </Day>
          </DayStyle>
        ))}
      </DatePickerContainer>
    </Container>
  );
};

// TODO: define Calender component with scrollable 12months
export const Calender = () => {
  return <>calender</>;
};
