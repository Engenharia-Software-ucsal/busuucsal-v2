import { setHours, setMinutes } from "date-fns/fp";
import { flow } from "lodash";

export const transformTimeStringToDate = (
  time: string,
  currentDate?: Date,
): Date => {
  const [hour, minute] = time.split(":").map(Number);

  return flow(setHours(hour), setMinutes(minute))(currentDate ?? new Date());
};
