import { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { MARGIN } from "../constants";

/**
 * This function internally creates a clone of the Dayjs object.
 * This means that the user of this function will not be aware
 * of the object's referent.
 */
const getNextYearMonthList = (date: Dayjs) =>
  Array.from(new Array(12)).map((_, i) => date.clone().add(i, "month"));

const getPrevYearMonthList = (date: Dayjs) =>
  Array.from(new Array(12)).map((_, i) =>
    date.clone().subtract(12 - i, "month")
  );

export const useScroll = (d: Dayjs, ref: React.RefObject<HTMLDivElement>) => {
  const [loaded, setLoaded] = useState<{
    prev: Dayjs;
    next: Dayjs;
  }>({
    prev: d.subtract(12, "month"),
    next: d.add(1, "year"),
  });
  const [monthList, setMonthList] = useState<Dayjs[]>([
    ...getPrevYearMonthList(d),
    ...getNextYearMonthList(d),
  ]);

  const handleScrollDown = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    const { scrollTop, clientHeight, scrollHeight } = ref.current;

    if (scrollTop + clientHeight + MARGIN >= scrollHeight) {
      const prevYearMonthList = getPrevYearMonthList(loaded.next);
      const nextYearMonthList = getNextYearMonthList(loaded.next);

      const next = loaded.next.add(1, "year");
      const prev = loaded.prev.add(1, "year");

      setLoaded({ next, prev });
      setMonthList([...prevYearMonthList, ...nextYearMonthList]);
    }
  }, [loaded]);

  const handleScrollUp = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    const { scrollTop } = ref.current;

    if (scrollTop - MARGIN <= 0) {
      const prevYearMonthList = getPrevYearMonthList(loaded.prev);
      const nextYearMonthList = getNextYearMonthList(loaded.prev);

      const next = loaded.next.subtract(1, "year");
      const prev = loaded.prev.subtract(1, "year");

      setLoaded({ next, prev });
      setMonthList([...prevYearMonthList, ...nextYearMonthList]);
    }
  }, [loaded]);

  useEffect(() => {
    const targets = document.getElementsByClassName(d.format("YYYY-MM"));
    for (const target of targets) {
      target.scrollIntoView({ block: "center" });
    }
  }, []);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.addEventListener("scroll", handleScrollUp);
    }

    return () => {
      if (ref.current !== null) {
        ref.current.removeEventListener("scroll", handleScrollUp);
      }
    };
  }, [loaded.prev]);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.addEventListener("scroll", handleScrollDown);
    }

    return () => {
      if (ref.current !== null) {
        ref.current.removeEventListener("scroll", handleScrollDown);
      }
    };
  }, [loaded.next]);

  return { monthList };
};
