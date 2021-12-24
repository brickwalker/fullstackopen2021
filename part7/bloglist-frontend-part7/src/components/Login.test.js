import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";

test("should invoke onSubmit handler when login button clicked", () => {
  const mockHandler = jest.fn((e) => e.preventDefault());
  const component = render(
    <Login
      onSubmit={mockHandler}
      username="testUserName"
      setUsername={() => {}}
      password="testPassword"
      setPassword={() => {}}
    />
  );
  const form = component.container.querySelector("form");
  fireEvent.submit(form);
  expect(mockHandler.mock.calls).toHaveLength(1);
});
