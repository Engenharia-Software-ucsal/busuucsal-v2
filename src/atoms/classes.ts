import { isAfter } from "date-fns";
import { atom } from "jotai";
import { isEmpty, reduce } from "lodash";
import { currentDateAtom, currentDayAtom } from "@/atoms/date";
import { type ClassesInDay, classSchedule } from "@/constants/classes";
import { transformTimeStringToDate } from "@/constants/helpers";
import type { DaysOfWeekWithoutSundayAndSaturday } from "@/constants/types";

const currentClassRoomByDateAtom = atom<ClassesInDay | null>((get) => {
	return classSchedule[get(currentDayAtom) as DaysOfWeekWithoutSundayAndSaturday];
});

const currentEarlyClassAtom = atom<{ room: string; date: string }>((get) => {
	const currentClassRoom = get(currentClassRoomByDateAtom);
	const currentDate = get(currentDateAtom);

	return reduce(
		currentClassRoom?.classes,
		(earlyClass, current) => {
			if (isEmpty(earlyClass)) {
				earlyClass = {
					room: current.room,
					date: current.startAt,
				};
				return earlyClass;
			}

			const accStartAt = transformTimeStringToDate(earlyClass.date, currentDate);
			const currentStartAt = transformTimeStringToDate(current.startAt, currentDate);

			earlyClass = isAfter(accStartAt, currentStartAt) ? { room: current.room, date: current.startAt } : earlyClass;

			return earlyClass;
		},
		{} as { room: string; date: string },
	);
});

export { currentClassRoomByDateAtom, currentEarlyClassAtom };
