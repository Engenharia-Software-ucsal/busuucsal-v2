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
	const { isPending, data: results } = useQuery({ queryKey: fetchDailyClass.name, request: fetchDailyClass });

	const data = [results, results].map((item, index) => ({
		...item,
		id: Math.random().toString(),
		time: index === 0 ? "19:00 - 20:30" : "20:30 - 21:30",
	}));

	return {
		data,
		isLoading: isPending,
	};
}
