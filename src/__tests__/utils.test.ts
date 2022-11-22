import dayjs from "dayjs";
import { getPrevYearMonthList, getNextYearMonthList } from "../utils";

test("getPrevYearMonthList", () => {
  const list = getPrevYearMonthList(dayjs("2021-01-01"));
  expect(list).toHaveLength(12);
  expect(list[0].format("YYYY-MM")).toBe("2020-01");
  expect(list[11].format("YYYY-MM")).toBe("2020-12");
});

test("getNextYearMonthList", () => {
  const list = getNextYearMonthList(dayjs("2021-01-01"));
  expect(list).toHaveLength(12);
  expect(list[0].format("YYYY-MM")).toBe("2021-01");
  expect(list[11].format("YYYY-MM")).toBe("2021-12");
});
