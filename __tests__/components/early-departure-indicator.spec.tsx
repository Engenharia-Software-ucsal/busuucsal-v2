import { currentDateAtom } from "@/atoms/date";
import { TestJotaiProvider } from "@/atoms/hydrate-provider";
import { EarlyDepartureIndicator } from "@/components/home/early-departure-indicator";
import { render } from "@testing-library/react-native";
import dayjs from "dayjs";

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

  it("should be to render the early departure indicator", () => {
    const fakeDate = dayjs("2024-11-21").set("hour", 13).toDate();

    const { getByTestId } = render(
      <TestJotaiProvider initialValues={[[currentDateAtom, fakeDate]]}>
        <EarlyDepartureIndicator />
      </TestJotaiProvider>,
    );

    const earlyNextDepartureHour = getByTestId("earlyNextDepartureHour")
      .children[0];

    expect(earlyNextDepartureHour).toBe("17:10");
  });

  test("should be able to show a fallback message if there are no next departures", () => {
    const fakeDate = dayjs("2024-11-10").set("hour", 13).toDate();

    const { getByTestId } = render(
      <TestJotaiProvider initialValues={[[currentDateAtom, fakeDate]]}>
        <EarlyDepartureIndicator />
      </TestJotaiProvider>,
    );

    const earlyNextDepartureHour = getByTestId("earlyNextDepartureHour")
      .children[0];

    expect(earlyNextDepartureHour).toBe("Sem horários");
  });

  test(" should be able to show how long until the match", () => {
    const fakeDate = dayjs("2024-11-21").set("hour", 13).toDate();

    const { getByTestId } = render(
      <TestJotaiProvider initialValues={[[currentDateAtom, fakeDate]]}>
        <EarlyDepartureIndicator />
      </TestJotaiProvider>,
    );

    const earlyNextDepartureHour = getByTestId("distanceToNextDeparture")
      .children[0];

    expect(earlyNextDepartureHour).toBe("em cerca de 4 horas");
  });
});
