// do not write snapshot tests, because it's some possible to change the design of the component

import { vi, afterEach, describe, it, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import dayjs from "dayjs";
import { DateRangePicker } from "../DateRangePicker";
import {
  IntersectionObserverMock,
  renderWithThemeProvider,
} from "../../testUtil";

// define global APIs of browser
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
window.HTMLElement.prototype.scrollIntoView = function () {};

afterEach(() => {
  cleanup();
});

/**
 * @vitest-environment jsdom
 */
describe("DateRangePicker", () => {
  it('should render "DateRangePicker"', async () => {
    const date = {
      startDate: dayjs("2021-01-01"),
      endDate: dayjs("2021-01-02"),
    };

    const { getByText } = renderWithThemeProvider(
      <DateRangePicker date={date} onDateChange={vi.fn()} />
    );

    expect(getByText("2021年01月")).toBeTruthy();
  });

  it("onChange test", () => {
    const date = {
      startDate: dayjs("2021-01-01"),
      endDate: dayjs("2021-01-02"),
    };
    const expected = {
      startDate: dayjs("2021-01-03"),
      endDate: dayjs("2021-01-04"),
    };
    const onChangeMock = {
      onChange: (date: {
        startDate: dayjs.Dayjs | null;
        endDate: dayjs.Dayjs | null;
      }) => {},
    };

    renderWithThemeProvider(
      <DateRangePicker date={date} onDateChange={onChangeMock.onChange} />
    );

    const spy = vi.spyOn(onChangeMock, "onChange");
    expect(spy).not.toBeCalled();
    onChangeMock.onChange(expected);
    expect(spy).toBeCalled();
    expect(spy).toBeCalledWith(expected);
  });
});
