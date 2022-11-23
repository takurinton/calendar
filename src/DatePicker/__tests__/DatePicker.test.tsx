// do not write snapshot tests, because it's some possible to change the design of the component

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { DatePicker } from "../DatePicker";

describe("DatePicker", () => {
  it("should scroll down", () => {
    const date = dayjs("2021-01-01");
    render(<DatePicker date={date} onDateChange={jest.fn()} />);
    const scrollArea = screen.getByTestId("scroll-area");
    // scroll event is not supported...
    userEvent.scroll(scrollArea, { deltaY: 500 });
    expect(scrollArea).toHaveTextContent("2021-01");
  });
});
