import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Home from "../index";

jest.mock("../../../utils/formatDateAndTime", () => ({
  formatDateAndTime: jest.fn((text, timezone) => {
    const originalResult = jest
      .requireActual("../../../utils/formatDateAndTime")
      .formatDateAndTime(text, timezone);
    return originalResult;
  }),
}));

describe("Home Component", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("displays formatted date and time", async () => {
    const { getByLabelText, getByText } = render(<Home />);

    fireEvent.change(getByLabelText("Text"), {
      target: { value: "26th Jan 12:00 PM" },
    });
    fireEvent.change(getByLabelText("Choose a timezone:"), {
      target: { value: "America/Los_Angeles" },
    });

    screen.logTestingPlaygroundURL();
    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      const resultText = screen.getByText("2024-01-26 12:00:00 PM (-08:00)");
      expect(resultText).toBeTruthy();
    });
  });

  it("displays error message if input is not having valid time", async () => {
    const { getByLabelText, getByText } = render(<Home />);

    fireEvent.change(getByLabelText("Text"), {
      target: { value: "Test Text" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      const resultText = screen.getByText(
        /No valid date and time found in input text./i
      );
      expect(resultText).toBeTruthy();
    });
  });
});
