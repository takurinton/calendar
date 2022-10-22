import { FC, useCallback, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { weekList } from "./constants";
import { Container, DatePickerContainer, DayStyle } from "./styled";
import { Day } from "./intrenal";
import { Typography } from "ingred-ui";

type Props = {
  date?: Dayjs;
  onChange?: (date: Dayjs) => void;
};

/**
 * @todo view calendar ui
 * @todo select date
 * @todo update date
 */
export const DatePicker: FC<Props> = ({ date = dayjs(), onChange }) => {
  const daysList = Array.from(new Array(date.daysInMonth()), (_, i) => i + 1);
  const dayOfWeek = date.day();

  // TODO: props
  const [selectedDate, setSelectedDate] = useState<Dayjs>(date);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const date = dayjs(event.target.value);
      onChange?.(date);
    },
    [onChange]
  );

  return (
    <Container>
      <Typography align="center" component="h1" weight="bold">
        {date.month() + 1}月
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
              onClickDate={(newDay) => {
                setSelectedDate(newDay);
                onChange?.(newDay);
              }}
              selected={selectedDate.date() === day}
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
