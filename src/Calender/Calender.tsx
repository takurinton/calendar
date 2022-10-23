import dayjs, { Dayjs } from "dayjs";
import { ScrollArea } from "ingred-ui";
import { FC, useMemo } from "react";
import { DatePicker } from "../DatePicker";
import { Container } from "./styled";

type Props = {
  date?: Dayjs;
  onDateChange?: (date: Dayjs) => void;
};

const HEIGHT = "400px";

/**
 * Calender UI
 * Scrollable calendar UI.
 * Currently, one year from the currently selected date is displayed.
 * @todo Can scroll to infinite.
 * @todo Can selected before date.
 * @todo Can display selected date by default.
 */
export const Calender: FC<Props> = ({ date = dayjs(), onDateChange }) => {
  // stupid hack...
  // This is not the original purpose of memoization, but to fix values.
  const d = useMemo(() => date.clone(), []);

  const nextYearMonthList = Array.from(new Array(12)).map((_, i) =>
    d.clone().add(i, "month")
  );
  const prevYearMonthList = Array.from(new Array(12)).map((_, i) =>
    d.clone().subtract(12 - i, "month")
  );

  const monthList = [...prevYearMonthList, ...nextYearMonthList];

  const vdate = date.clone();

  return (
    <Container>
      <ScrollArea minHeight={HEIGHT} maxHeight={HEIGHT}>
        <>
          {monthList.map((m) => (
            <DatePicker
              key={m.format("YYYY-MM-DD")}
              date={m}
              vdate={vdate}
              onDateChange={onDateChange}
            />
          ))}
        </>
      </ScrollArea>
    </Container>
  );
};
