import { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
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

  const options = useMemo(
    () => ({ root: ref.current, rootMargin: `${MARGIN}px`, threshold: 0.1 }),
    [ref]
  );

  useEffect(() => {
    const targets = document.getElementsByClassName(d.format("YYYY-MM"));
    for (const target of targets) {
      target.scrollIntoView({ block: "center" });
    }
  }, []);

  useEffect(() => {
    // typeof https://developer.mozilla.org/ja/docs/Web/API/IntersectionObserverEntry
    const cb = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const next = loaded.next.add(1, "year");
          const prev = loaded.prev.add(1, "year");

          const prevYearMonthList = getPrevYearMonthList(loaded.next);
          const nextYearMonthList = getNextYearMonthList(loaded.next);

          setLoaded({ next, prev });
          setMonthList([...prevYearMonthList, ...nextYearMonthList]);
        }
      });
    };

    const observer = new IntersectionObserver(cb, options);

    const target = document.getElementById(
      loaded.next.subtract(1, "month").format("YYYY-MM")
    );
    if (target === null) {
      return;
    }

    observer.observe(target);

    return () => {
      if (target !== null) {
        observer.unobserve(target);
      }
    };
  }, [loaded.next]);

  useEffect(() => {
    // typeof https://developer.mozilla.org/ja/docs/Web/API/IntersectionObserverEntry
    const cb = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const next = loaded.next.subtract(1, "year");
          const prev = loaded.prev.subtract(1, "year");

          const prevYearMonthList = getPrevYearMonthList(loaded.prev);
          const nextYearMonthList = getNextYearMonthList(loaded.prev);

          setLoaded({ next, prev });
          setMonthList([...prevYearMonthList, ...nextYearMonthList]);
        }
      });
    };

    const observer = new IntersectionObserver(cb, options);

    const target = document.getElementById(
      loaded.prev.add(1, "month").format("YYYY-MM")
    );
    if (target === null) {
      return;
    }

    observer.observe(target);

    return () => {
      if (target !== null) {
        observer.unobserve(target);
      }
    };
  }, [loaded.prev]);

  return { monthList };
};
