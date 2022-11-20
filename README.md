# Calendar UI

Prototyping to build a calendar UI component using dayjs.
It is mainly designed to use in [ingred-ui](https://github.com/voyagegroup/ingred-ui) as a component.

## Features

- [x] Display calendar
- [x] Select
  - [x] Select date
  - [x] Select date range
- [x] Scroll
  - [x] Scrollable calendar

## Usage

### DatePicker

```tsx
import dayjs, { Dayjs } from "dayjs";
import { createTheme, ThemeProvider } from "ingred-ui";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState<Dayjs>(dayjs());

  return (
    <ThemeProvider theme={theme}>
      <DatePicker date={date} onDateChange={setDate} />
    </ThemeProvider>
  );
}
```

### DateRangePicker

```tsx
import dayjs, { Dayjs } from "dayjs";
import { createTheme, ThemeProvider } from "ingred-ui";
import { useState } from "react";
import { DateRangePicker } from "./DateRangePicker";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({ startDate: dayjs(), endDate: dayjs().add(1, "week") });

  return (
    <ThemeProvider theme={theme}>
      <DateRangePicker date={date} onDateRangeChange={setDateRange} />
    </ThemeProvider>
  );
}
```

## cloc

```bash
% cloc . --vcs=git
      27 text files.
      24 unique files.
       3 files ignored.

github.com/AlDanial/cloc v 1.94  T=0.62 s (38.5 files/s, 1142.6 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      19             52             44            495
JSON                             3              0              0             56
Markdown                         1             11              0             38
HTML                             1              0              0             17
-------------------------------------------------------------------------------
SUM:                            24             63             44            606
-------------------------------------------------------------------------------
```
