import * as React from "react";
import renderer from "react-test-renderer";
import { NextDeparturesList } from "../home/next-departures-list";

describe("<NextDeparturesList />", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders NextDeparturesList component", () => {
    const tree = renderer.create(<NextDeparturesList />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render the list of next departures", () => {
    const tree = renderer.create(<NextDeparturesList />);
  });
});
