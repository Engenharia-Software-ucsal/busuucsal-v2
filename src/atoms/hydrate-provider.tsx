import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { ReactNode } from "react";

interface HydrateAtomsProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	initialValues: any;
	children: ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: HydrateAtomsProps) => {
	useHydrateAtoms(initialValues);
	return children;
};

export const TestJotaiProvider = ({ initialValues, children }: HydrateAtomsProps) => (
	<Provider>
		<HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
	</Provider>
);
