import dayjs, { Dayjs } from "dayjs";
import { createTheme, Spacer, ThemeProvider, Typography } from "ingred-ui";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { DateRangePicker } from "./DateRangePicker";

function App() {
  const theme = createTheme();

  const [date, setDate] = useState<Dayjs>(dayjs());
  const [dateRange, setDateRange] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({ startDate: dayjs(), endDate: dayjs().add(6, "day") });

  return (
    <ThemeProvider theme={theme}>
      <Typography component="h1" weight="bold">
        DatePicker
      </Typography>
      <Typography component="p">
        {`selected: ${date.format("YYYY-MM-DD")}`}
      </Typography>
      <DatePicker date={date} onDateChange={setDate} />
      <Spacer pb={2} />
      <Typography component="h1" weight="bold">
        DateRangePicker
      </Typography>
      <Typography component="p">
        {`selected: ${dateRange.startDate?.format(
          "YYYY-MM-DD"
        )} -  ${dateRange.endDate?.format("YYYY-MM-DD")}`}
      </Typography>
      <DateRangePicker date={dateRange} onDateChange={setDateRange} />
    </ThemeProvider>
  );
}

export default App;
