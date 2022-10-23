import dayjs, { Dayjs } from "dayjs";
import { createTheme, ThemeProvider } from "ingred-ui";
import { useState } from "react";
import { Calender } from "./Calender";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleChangeDate = (newDate: Dayjs) => {
    console.log(`selected: ${newDate.format("YYYY-MM-DD")}`);
    setDate(newDate);
  };

  return (
    <ThemeProvider theme={theme}>
      <Calender date={date} onDateChange={handleChangeDate} />
    </ThemeProvider>
  );
}

export default App;
