import { currentDateAtom } from "@/atoms/date";
import { TestJotaiProvider } from "@/atoms/hydrate-provider";
import { render } from "@testing-library/react-native";
import dayjs from "dayjs";
import {
  NextDepartureListIem,
  NextDeparturesList,
} from "../home/next-departures-list";
describe("<NextDeparturesList />", () => {
  beforeAll(() => {
    jest.useFakeTimers(); // Switches to fake timers
  });

  afterAll(() => {
    jest.useRealTimers(); // Restores real timers after all tests
  });
  it("should render the list of next departures by currentDate", () => {
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
});
