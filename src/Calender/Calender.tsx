import { Dayjs } from "dayjs";
import { ScrollArea } from "ingred-ui";
import { FC } from "react";
import { DatePicker } from "../DatePicker";
import { Container } from "./styled";

type Props = {
  date?: Dayjs;
  onDateChange?: (date: Dayjs) => void;
};

const HEIGHT = "400px";

// TODO: define Calender component with scrollable 12months
export const Calender: FC<Props> = ({ date, onDateChange }) => {
  return (
    <Container>
      <ScrollArea minHeight={HEIGHT} maxHeight={HEIGHT}>
        <>
          <DatePicker date={date} onDateChange={onDateChange} />
          <DatePicker date={date} onDateChange={onDateChange} />
          <DatePicker date={date} onDateChange={onDateChange} />
          <DatePicker date={date} onDateChange={onDateChange} />
          <DatePicker date={date} onDateChange={onDateChange} />
        </>
      </ScrollArea>
    </Container>
  );
};
