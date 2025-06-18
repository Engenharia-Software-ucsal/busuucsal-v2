import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { useCallback } from "react";

export type MutationDetails = {
	state: "idle" | "pending" | "success" | "error";
	error: unknown | null;
	data: unknown | null;
};

export type MutationManager = Map<string, MutationDetails>;

const defaultMutationState = {
	data: null,
	error: null,
	state: "idle",
} satisfies MutationDetails;

export const mutationStoreAtom = atom<MutationManager>(new Map());

export const mutationAtom = atomFamily((mutationKey: string) =>
	atom(
		(get) => get(mutationStoreAtom).get(mutationKey) ?? defaultMutationState,
		(get, set, args: Partial<MutationDetails>) => {
			const mutationStore = get(mutationStoreAtom);

			const newState = new Map<string, MutationDetails>(mutationStore.entries());

			const oldState = mutationStore.get(mutationKey) ?? defaultMutationState;

			newState.set(mutationKey, {
				...oldState,
				...args,
			});

			set(mutationStoreAtom, newState);
		},
	),
);

export interface UseMutationOptions<Params, Response = unknown> {
	mutationKey: string;
	requestMutation: (params: Params) => Promise<Response>;
	onSuccess?: (response: Response) => void;
	onError?: (error: unknown) => void;
}

export function useMutation<Params, Response>({
	mutationKey,
	requestMutation,
	onError = () => {},
	onSuccess = () => {},
}: UseMutationOptions<Params, Response>) {
	const [mutation, setMutation] = useAtom(mutationAtom(mutationKey));

	const mutate = useCallback(
		(params: Params) => {
			setMutation({
				state: "pending",
				error: null,
			});

			requestMutation(params)
				.then((results) => {
					setMutation({
						state: "success",
						error: null,
						data: results,
					});

					onSuccess(results);
				})
				.catch((error) => {
					setMutation({
						state: "error",
						error,
					});

					onError(error);
				});
		},
		[requestMutation, setMutation, onSuccess, onError],
	);

	const isPending = mutation.state === "pending";
	const isSuccess = mutation.state === "success";
	const isError = mutation.state === "error";
	const isIdle = mutation.state === "idle";

	return {
		mutate,
		 isPending,
		isSuccess,
		isError,
		isIdle,
	};
}
