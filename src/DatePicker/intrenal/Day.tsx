import dayjs, { Dayjs } from "dayjs";
import React, { FC, useCallback } from "react";
import { DayContainer } from "./styled";

type Props = {
  selected: boolean;
  value: Dayjs;
  onClickDate?: (newDate: Dayjs) => void;
  children: React.ReactNode;
};

export const Day: FC<Props> = ({ selected, value, onClickDate, children }) => (
  <DayContainer
    selected={selected}
    onClick={() => {
      onClickDate?.(value);
    }}
  >
    {children}
  </DayContainer>
);
