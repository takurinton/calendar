import { Dayjs } from "dayjs";
import { FC, memo, ReactNode } from "react";
import { DayContainer } from "./styled";

type Props = {
  selected: boolean;
  isBetween: boolean;
  value: Dayjs;
  onClickDate?: (value: Dayjs) => void;
  children: ReactNode;
};

export const Day: FC<Props> = memo(
  ({ selected, isBetween, value, onClickDate, children }) => (
    <DayContainer
      selected={selected}
      isBetween={isBetween}
      onClick={() => {
        onClickDate?.(value);
      }}
    >
      {children}
    </DayContainer>
  )
);
