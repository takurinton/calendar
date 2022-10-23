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

export const Calender: FC<Props> = ({ date = dayjs(), onDateChange }) => {
  // stupid hack...
  const d = useMemo(() => date.clone(), []);

  const nextYearMonthList = Array.from(new Array(12)).map((_, i) =>
    d.clone().add(i, "month")
  );

  const vdate = date.clone();

  return (
    <Container>
      <ScrollArea minHeight={HEIGHT} maxHeight={HEIGHT}>
        <>
          {nextYearMonthList.map((m) => (
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
