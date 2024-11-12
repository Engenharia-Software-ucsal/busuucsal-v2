import { currentDateAtom } from "@/atoms/date";
import { TestJotaiProvider } from "@/atoms/hydrate-provider";
import { render } from "@testing-library/react-native";
import dayjs from "dayjs";
import { EarlyDepartureIndicator } from "../home/early-departure-indicator";

describe("<EarlyDepartureIndicator/>", () => {
  beforeAll(() => {
    jest.useFakeTimers(); // Switches to fake timers
  });

  afterAll(() => {
    jest.useRealTimers(); // Restores real timers after all tests
  });

  it("should de able to render the early departure indicator date title", () => {
    const fakeDate = dayjs("2024-11-21").toDate();

    const { getByText } = render(
      <TestJotaiProvider initialValues={[[currentDateAtom, fakeDate]]}>
        <EarlyDepartureIndicator />
      </TestJotaiProvider>,
    );

    expect(getByText("Quinta-feira, 21 de novembro")).toBeTruthy();
  });
});
