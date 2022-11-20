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
  }>({ startDate: dayjs(), endDate: dayjs().add(1, "week") });

  const handleChangeDate = (newDate: Dayjs) => {
    console.log(`selected: ${newDate.format("YYYY-MM-DD")}`);
    setDate(newDate);
  };

  const handleChangeDateRange = (newDateRange: {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }) => {
    console.log(
      `selected: ${newDateRange.startDate?.format(
        "YYYY-MM-DD"
      )} - ${newDateRange.endDate?.format("YYYY-MM-DD")}`
    );
    setDateRange(newDateRange);
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography component="h1">DatePicker</Typography>
      <DatePicker date={date} onDateChange={handleChangeDate} />
      <Spacer pb={2} />
      <Typography component="h1">DateRangePicker</Typography>
      <DateRangePicker date={dateRange} onDateChange={handleChangeDateRange} />
    </ThemeProvider>
  );
}

export default App;
