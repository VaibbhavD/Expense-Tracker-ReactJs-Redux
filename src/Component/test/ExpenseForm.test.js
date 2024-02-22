import ExpenseForm from "./ExpenseForm";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../Store/Redux/ReduxStore";

describe("Async Component", () => {
  test("renders", async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const items = await screen.findByText("Description");
    expect(items).toBeInTheDocument();
  });

  test("renders", async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const items = await screen.findAllByRole("button");
    expect(items).not.toHaveLength(0);
  });

  // test("renders", async () => {
  //   render(
  //     <Provider store={store}>
  //       <ExpenseForm />
  //     </Provider>
  //   );

  //   const items = await screen.findAllByRole("alert");
  //   expect(items).isInTheDocument();
  // });

  test("renders", async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const items = await screen.findByText("Amount");
    expect(items).toBeInTheDocument();
  });
  test("renders", async () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const items = await screen.findByText("Add Your Expenses");
    expect(items).toBeInTheDocument();
  });
});
