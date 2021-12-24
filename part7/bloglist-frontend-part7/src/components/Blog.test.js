import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "Kari4",
  author: "Olga Kari3",
  url: "https://karifood.com/3",
  likes: 5003,
  user: {
    username: "brickwalker",
    name: "Artem Nedostup",
    id: "61bb36a267c8aa3148e34f7a",
  },
  id: "61bb880efcf9d3ac14d12232",
};

describe("default display", () => {
  test("should display title and author", () => {
    const component = render(<Blog blog={blog} displayMessage={() => {}} />);
    const blogHeader = component.getByText(`${blog.title} - ${blog.author}`);
    expect(blogHeader).toBeVisible();
  });

  test("should not display url, likes and user", () => {
    const component = render(<Blog blog={blog} displayMessage={() => {}} />);
    const url = component.getByText(`http`, { exact: false });
    expect(url).not.toBeVisible();
    const likes = component.getByText(`likes`, { exact: false });
    expect(likes).not.toBeVisible();
    const user = component.getByText(`${blog.user.name}`, { exact: false });
    expect(user).not.toBeVisible();
  });
});

describe("expanded display", () => {
  test("should display title and author", () => {
    const component = render(<Blog blog={blog} displayMessage={() => {}} />);
    const button = component.getByText("view");
    fireEvent.click(button);
    const blogHeader = component.getByText(`${blog.title} - ${blog.author}`);
    expect(blogHeader).toBeVisible();
  });

  test("should display url, likes and user", () => {
    const component = render(<Blog blog={blog} displayMessage={() => {}} />);
    const button = component.getByText("view");
    fireEvent.click(button);
    const url = component.getByText(`http`, { exact: false });
    expect(url).toBeVisible();
    const likes = component.getByText(`likes`, { exact: false });
    expect(likes).toBeVisible();
    const user = component.getByText(`${blog.user.name}`, { exact: false });
    expect(user).toBeVisible();
  });
});
