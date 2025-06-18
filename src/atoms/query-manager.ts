import { atom, useAtom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import { useCallback, useEffect } from "react";

export type QueryState = "idle" | "pending" | "success" | "error" | "invalidating";

export type QueryDetails<Data = unknown> = {
	data: Data | null;
	state: QueryState;
	error: unknown | null;
};

export type QueryManager = Map<string, QueryDetails>;

const defaultQueryState = {
	data: null,
	error: null,
	state: "idle",
} satisfies QueryDetails;

export const queryStoreAtom = atom<QueryManager>(new Map());

export const queryAtom = atomFamily((queryKey: string) =>
	atom(
		(get) => get(queryStoreAtom).get(queryKey) ?? defaultQueryState,
		(get, set, args: Partial<QueryDetails>) => {
			const queryStore = get(queryStoreAtom);

			const newState = new Map<string, QueryDetails>(queryStore.entries());

			const oldState = queryStore.get(queryKey) ?? defaultQueryState;

			newState.set(queryKey, {
				...oldState,
				...args,
			});

			set(queryStoreAtom, newState);
		},
	),
);

export interface UseQueryOptions<Response = unknown> {
	queryKey: string;
	request: () => Promise<Response>;
}

export function useQuery<Response>({ queryKey, request }: UseQueryOptions<Response>) {
	const [query, setQuery] = useAtom(queryAtom(queryKey));

	const makeRequest = useCallback(() => {
		setQuery({
			state: "pending",
			error: null,
		});

		request()
			.then((data) => {
				setQuery({
					state: "success",
					error: null,
					data,
				});
			})
			.catch((error) => {
				setQuery({
					state: "error",
					error,
				});
			});
	}, [request, setQuery]);

	useEffect(() => {
		makeRequest();
	}, [makeRequest]);

	const isPending = query.state === "pending";
	const isSuccess = query.state === "success";
	const isError = query.state === "error";
	const isInvalidating = query.state === "invalidating";

	return {
		data: query.data as Awaited<ReturnType<typeof request>>,
		isPending,
		isSuccess,
		isError,
		isInvalidating,
		refetch: makeRequest,
	};
}

export function useQueryState(queryKey: string) {
	return useAtomValue(queryAtom(queryKey));
}
