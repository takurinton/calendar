import dayjs, { Dayjs } from "dayjs";
import { createTheme, ThemeProvider } from "ingred-ui";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleChangeDate = (newDate: Dayjs) => {
    console.log(`selected: ${newDate.format("YYYY-MM-DD")}`);
    setDate(newDate);
  };

  return (
    <ThemeProvider theme={theme}>
      <DatePicker date={date} onDateChange={handleChangeDate} />
    </ThemeProvider>
  );
}

export default App;
