import { format } from "date-fns";
import { setDay, setHours, setMilliseconds, setMinutes } from "date-fns/fp";
import { ptBR } from "date-fns/locale";
import { flow } from "lodash";
import { DaysOfWeek } from "./types";

export const transformTimeStringToDate = (
  time: string,
  currentDate?: Date,
): Date => {
  const [hour, minute] = time.split(":").map(Number);

  return flow(setHours(hour), setMinutes(minute))(currentDate ?? new Date());
};

export const giveRandomDateByWeekDay = (weekDay: DaysOfWeek): Date => {
  return flow(
    setDay(weekDay),
    setHours(0),
    setMinutes(0),
    setMilliseconds(0),
  )(new Date());
};

export const formatDateString = (date: Date): string => {
  return format(date, "eeee, d 'de' MMMM", { locale: ptBR }).replace(
    /^\w/,
    (c) => c.toUpperCase(),
  );
};
