import { currentDateAtom } from "@/atoms/date";
import { TestJotaiProvider } from "@/atoms/hydrate-provider";
import {
  NextDepartureListIem,
  NextDeparturesList,
} from "@/components/home/next-departures-list";
import { render } from "@testing-library/react-native";
import dayjs from "dayjs";
describe("<NextDeparturesList />", () => {
  beforeAll(() => {
    jest.useFakeTimers(); // Switches to fake timers
  });

  afterAll(() => {
    jest.useRealTimers(); // Restores real timers after all tests
  });
  test("should render the list of next departures by currentDate", () => {
    const dateOnDayIsAMonday = dayjs().set("day", 2).set("hours", 20).toDate();

    jest.setSystemTime(dateOnDayIsAMonday);

    const { getByTestId } = render(
      <TestJotaiProvider
        initialValues={[[currentDateAtom, dateOnDayIsAMonday]]}
      >
        <NextDeparturesList />
      </TestJotaiProvider>,
    );

    const listOfItems = getByTestId("next_departures_list").findAllByType(
      NextDepartureListIem,
    );

    expect(listOfItems).toBeTruthy();

    expect(listOfItems.length).toBe(1);
  });

  test("should render empty list message", () => {
    const dateWithHourAfterAllDepartures = dayjs("2024-11-21")
      .set("hour", 23)
      .toDate();

    const { getByText } = render(
      <TestJotaiProvider
        initialValues={[[currentDateAtom, dateWithHourAfterAllDepartures]]}
      >
        <NextDeparturesList />
      </TestJotaiProvider>,
    );

    expect(getByText("Nenhum horário disponível")).toBeTruthy();
  });
});
