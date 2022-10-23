import dayjs, { Dayjs } from "dayjs";
import { ScrollArea } from "ingred-ui";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { DatePicker } from "../DatePicker";
import { Container } from "./styled";

type Props = {
  date?: Dayjs;
  onDateChange?: (date: Dayjs) => void;
};

const HEIGHT = "400px";

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

  const nextYearMonthList = Array.from(new Array(12)).map((_, i) =>
    d.clone().add(i, "month")
  );
  const prevYearMonthList = Array.from(new Array(12)).map((_, i) =>
    d.clone().subtract(12 - i, "month")
  );

  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState<{
    prev: Dayjs;
    next: Dayjs;
  }>({
    prev: d.clone().subtract(12, "month"),
    next: d.add(1, "year"),
  });
  const [monthList, setMonthList] = useState<Dayjs[]>([
    ...prevYearMonthList,
    ...nextYearMonthList,
  ]);

  const vdate = date.clone();

  const handleScrollDown = () => {
    if (ref.current === null) {
      return;
    }

    const { scrollTop, clientHeight, scrollHeight } = ref.current;

    const next = loaded.next.add(1, "year");

    if (scrollTop + clientHeight + 100 >= scrollHeight) {
      const nextYearMonthList = Array.from(new Array(12)).map((_, i) =>
        loaded.next.clone().add(i, "month")
      );
      setLoaded({ next, prev: loaded.prev });
      setMonthList([...monthList, ...nextYearMonthList]);
    }
  };

  const handleScrollUp = () => {
    if (ref.current === null) {
      return;
    }

    const { scrollTop } = ref.current;

    const prev = loaded.prev.subtract(1, "year");
    if (scrollTop - 100 <= 0) {
      const prevYearMonthList = Array.from(new Array(12)).map((_, i) =>
        loaded.prev.clone().subtract(12 - i, "month")
      );
      setLoaded({ next: loaded.next, prev });
      setMonthList([...prevYearMonthList, ...monthList]);
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
      ref.current.addEventListener("scroll", handleScrollDown);
    }

    return () => {
      if (ref.current !== null) {
        ref.current.removeEventListener("scroll", handleScrollUp);
        ref.current.removeEventListener("scroll", handleScrollDown);
      }
    };
  }, [loaded]);

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
