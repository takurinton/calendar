import { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { MARGIN } from "./constants";
import { getNextYearMonthList, getPrevYearMonthList } from "./utils";

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

      // debug([...prevYearMonthList, ...nextYearMonthList], "load next");

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

      // debug([...prevYearMonthList, ...nextYearMonthList], "load prev");

      const next = loaded.next.subtract(1, "year");
      const prev = loaded.prev.subtract(1, "year");

      setLoaded({ next, prev });
      setMonthList([...prevYearMonthList, ...nextYearMonthList]);
    }
  }, [loaded]);

  // TODO: SSR support
  useEffect(() => {
    const target = document.getElementById(d.format("YYYY-MM"));
    if (target !== null) {
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
