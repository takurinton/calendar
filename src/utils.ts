import { Dayjs } from "dayjs";

/**
 * debug function
 */
export const debug = (list: Dayjs[], ...message: string[]) => {
  console.log(...message);
  list.map((d) => {
    console.log(d.format("YYYY-MM"));
  });
  console.log("");
};
