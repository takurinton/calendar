import { Dayjs } from "dayjs";

/**
 * This function internally creates a clone of the Dayjs object.
 * This means that the user of this function will not be aware
 * of the object's referent.
 */
export const getNextYearMonthList = (date: Dayjs) =>
  Array.from(new Array(12)).map((_, i) => date.clone().add(i, "month"));

/**
 * This function internally creates a clone of the Dayjs object.
 * This means that the user of this function will not be aware
 * of the object's referent.
 */
export const getPrevYearMonthList = (date: Dayjs) =>
  Array.from(new Array(12)).map((_, i) =>
    date.clone().subtract(12 - i, "month")
  );

/**
 * debug function
 */
const debug = (list: Dayjs[], ...message: string[]) => {
  console.log(...message);
  list.map((d) => {
    console.log(d.format("YYYY-MM"));
  });
  console.log("");
};
