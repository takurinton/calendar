import dayjs, { Dayjs } from "dayjs";
import React, { FC, useCallback } from "react";
import { DayContainer } from "./styled";

type Props = {
  selected: boolean;
  value: number;
  onClickDate?: (newDate: Dayjs) => void;
  children: React.ReactNode;
};

export const Day: FC<Props> = ({ selected, value, onClickDate, children }) => {
  const handleChange = useCallback(
    (newDay: number) => {
      console.log(dayjs().date(newDay));
      onClickDate?.(dayjs().date(newDay));
    },
    [value]
  );

  return (
    <DayContainer
      selected={selected}
      onClick={() => {
        handleChange(value);
      }}
    >
      {children}
    </DayContainer>
  );
};
