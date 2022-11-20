# Calendar UI

Prototyping to build a calendar UI component using dayjs.
It is mainly designed to use in [ingred-ui](https://github.com/voyagegroup/ingred-ui) as a component.

## Features

- [x] Display calendar
- [ ] Select
  - [x] Select date
  - [ ] Select date range
  - [ ] Select month
  - [ ] Select year
- [ ] Scroll
  - [x] Scrollable calendar
  - [ ] Performance benchmark

## Usage

```tsx
import dayjs, { Dayjs } from "dayjs";
import { createTheme, ThemeProvider } from "ingred-ui";
import { useState } from "react";
// I want to do this in the future.
// import { Calendar } from "ingred-ui/DatePicker";
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
```

## Note

I wrote an explanatory note on this.

- [calendar ui](https://dev.takurinton.com/tech/frontend/calender-ui-prototype.html)
- [calender ui with infinity scroll](https://dev.takurinton.com/tech/frontend/calender-ui-prototype-with-scroll.html)
