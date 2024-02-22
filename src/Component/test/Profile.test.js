import { render, screen } from "@testing-library/react";
import Profile from "../Pages/Profile";
import { Provider } from "react-redux";
import store from "../../Store/Redux/ReduxStore";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ email: "two@two.com", password: "twotwotwo" }],
    });
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    const listItemElements = await screen.findByText(
      "Welcome For visit Our WebSite"
    );
    expect(listItemElements).toBeInTheDocument();
  });

  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ email: "two@two.com", password: "twotwotwo" }],
    });
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    const listItemElements = await screen.findByRole("button");
    expect(listItemElements).toBeEnabled();
  });
});
