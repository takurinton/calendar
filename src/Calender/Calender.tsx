import dayjs, { Dayjs } from "dayjs";
import { ScrollArea } from "ingred-ui";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { DatePicker } from "../DatePicker";
import { HEIGHT, MARGIN } from "./constants";
import { Container } from "./styled";
import { getNextYearMonthList, getPrevYearMonthList } from "./utils";

type Props = {
  date?: Dayjs;
  onDateChange?: (date: Dayjs) => void;
};

const debug = (list: Dayjs[], ...message: string[]) => {
  console.log(...message);
  list.map((d) => {
    console.log(d.format("YYYY-MM"));
  });
  console.log("");
};

/**
 * Calender UI
 * Scrollable calendar UI.
 * Currently, one year from the currently selected date is displayed.
 * @todo Can scroll to infinite.
 * @todo Can render current month when server-side rendering.
 */
export const Calender: FC<Props> = ({ date = dayjs(), onDateChange }) => {
  // stupid hack...
  // This is not the original purpose of memoization, but to fix values.
  const d = useMemo(() => date.clone(), []);

  const ref = useRef<HTMLDivElement>(null);
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

  const vdate = date.clone();

  const handleScrollDown = () => {
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
  };

  const handleScrollUp = () => {
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
  };

  // TODO: SSR support
  useEffect(() => {
    const target = document.getElementById(vdate.format("YYYY-MM"));
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

  return (
    <Container>
      <ScrollArea ref={ref} minHeight={HEIGHT} maxHeight={HEIGHT} id="calender">
        <>
          {monthList.map((m) => (
            <DatePicker
              key={m.format("YYYY-MM")}
              id={m.format("YYYY-MM")}
              date={m}
              vdate={vdate}
              onDateChange={onDateChange}
            />
          ))}
        </>
      </ScrollArea>
    </Container>
  );
};
