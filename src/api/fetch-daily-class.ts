import { useQuery } from "@/atoms/query-manager";
import { okamiNotifierApi } from "@/lib/axios";

export type LoadingState = "idle" | "pending" | "success" | "error" | "invalidating";

export type ClassRoom = {
	id: number;
	created_at: string;
	dayNumber: number;
	subject: string;
	room: string;
	teacher: string;
	semester_id: number;
	day: string;
};

export async function fetchDailyClass() {
	const { data } = await okamiNotifierApi.get<ClassRoom>("/classroom/daily");

	return data;
}

export function useFetchDailyClass() {
	const { isPending, data } = useQuery({ queryKey: fetchDailyClass.name, request: fetchDailyClass });

	return {
		data,
		isLoading: isPending,
	};
}
