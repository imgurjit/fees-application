import { render, screen } from "@testing-library/react";
import App from "./App";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const titleElement = screen.getByText("Fees Management Application");
  expect(titleElement).toBeInTheDocument();
});
