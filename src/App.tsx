import dayjs, { Dayjs } from "dayjs";
import { createTheme, ThemeProvider } from "ingred-ui";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState<Dayjs>(dayjs());

  return (
    <ThemeProvider theme={theme}>
      <DatePicker date={date} onChange={setDate} />
    </ThemeProvider>
  );
}

export default App;
