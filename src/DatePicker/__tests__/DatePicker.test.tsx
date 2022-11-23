// do not write snapshot tests, because it's some possible to change the design of the component

import { vi, afterEach, describe, it, expect } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import dayjs from "dayjs";
import { DatePicker } from "../DatePicker";
import {
  IntersectionObserverMock,
  renderWithThemeProvider,
  scrollIntoViewMock,
} from "../../testUtil";
import { useScroll } from "../../hooks/useScroll";

// define global APIs of browser
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
window.HTMLElement.prototype.scrollIntoView = function () {};
// vi.stubGlobal("scrollIntoView", scrollIntoViewMock);

afterEach(() => {
  cleanup();
});

/**
 * @vitest-environment jsdom
 */
describe("DatePicker", () => {
  it('should render "DatePicker"', async () => {
    const { getByText } = renderWithThemeProvider(
      <DatePicker date={dayjs("2021-01-01")} onDateChange={vi.fn()} />
    );

    expect(getByText("2021年01月")).toBeTruthy();
  });

  it("onChange test", () => {
    const date = dayjs("2021-01-01");
    const onChangeMock = {
      onChange: (date: dayjs.Dayjs) => {
        return date;
      },
    };

    renderWithThemeProvider(
      <DatePicker date={date} onDateChange={onChangeMock.onChange} />
    );

    const spy = vi.spyOn(onChangeMock, "onChange");
    expect(spy).not.toBeCalled();
    onChangeMock.onChange(dayjs("2021-01-02"));
    expect(spy).toBeCalled();
    expect(spy).toBeCalledWith(dayjs("2021-01-02"));
  });
});
