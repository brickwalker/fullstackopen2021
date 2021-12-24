import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import AddBlog from "./AddBlog";

test("form should have title, author and url fields visible", () => {
  const component = render(
    <AddBlog
      toggleVisibility={() => {}}
      setBlogs={() => {}}
      displayMessage={() => {}}
    />
  );
  const title = component.getByLabelText("title");
  expect(title).toBeVisible();
  const author = component.getByLabelText("author");
  expect(author).toBeVisible();
  const url = component.getByLabelText("url");
  expect(url).toBeVisible();
  const addButton = component.getByText("add");
  expect(addButton).toBeVisible();
});
