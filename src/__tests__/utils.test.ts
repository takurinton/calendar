import dayjs from "dayjs";
import { getPrevYearMonthList, getNextYearMonthList } from "../utils";

test("getMonthList", () => {
  const date = dayjs("2021-01-01");
  const beforMonthList = getPrevYearMonthList(date);
  expect(beforMonthList).toHaveLength(12);
  expect(beforMonthList[0].format("YYYY-MM")).toBe("2020-01");
  expect(beforMonthList[11].format("YYYY-MM")).toBe("2020-12");

  const afterMonthList = getNextYearMonthList(date);
  expect(afterMonthList).toHaveLength(12);
  expect(afterMonthList[0].format("YYYY-MM")).toBe("2021-01");
  expect(afterMonthList[11].format("YYYY-MM")).toBe("2021-12");
});
