import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

interface HydrateAtomsProps {
  initialValues: any;
  children: React.ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: HydrateAtomsProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

export const TestJotaiProvider = ({
  initialValues,
  children,
}: HydrateAtomsProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);
