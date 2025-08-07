import { useQuery } from "@/atoms/query-manager";
import { okamiNotifierApi } from "@/lib/axios";

export type LoadingState = "idle" | "pending" | "success" | "error" | "invalidating";

export interface ClassRoom {
	created_at: string;
	day: string;
	dayNumber: number;
	end_at: string;
	id: number;
	room: string;
	semester_id: number;
	start_at: string;
	subject: string;
	teacher: string;
}

export async function fetchDailyClass() {
	const currentDay = new Date().getDay();

	const { data } = await okamiNotifierApi.get<ClassRoom[]>("/classroom/daily", {
		params: {
			weekDay: currentDay,
		},
	});

	return data;
}

export function useFetchDailyClass() {
	return useQuery({ queryKey: fetchDailyClass.name, request: fetchDailyClass });
}
