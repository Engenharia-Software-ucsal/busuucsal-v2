import { getDay } from "date-fns";
import { atom } from "jotai";
import { formatDateString } from "@/constants/helpers";

export const currentDateAtom = atom(new Date());

export const currentDayAtom = atom((get) => getDay(get(currentDateAtom)));

export const formattedDateAtom = atom<string>((get) => formatDateString(get(currentDateAtom)));
