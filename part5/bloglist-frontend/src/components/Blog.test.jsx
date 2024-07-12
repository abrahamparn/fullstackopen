import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("Renders blog content", () => {
    const blog = {
      title: "Testing blog component",
      author: "abrahaminaja",
      url: "http://blog.testing.app",
      likes: 420,
      user: "668e085f0bd8aadb03daf305",
      id: "668e2aeef6de5cbf1cad7949",
    };

    render(<Blog blog={blog} />);

    screen.debug();

    const element = screen.getByText(`${blog.title} ${blog.author}`);

    expect(element).toBeDefined();
  });

  test("Blog does not render URL and LIkes", () => {
    const blog = {
      title: "Testing blog component",
      author: "abrahaminaja",
      url: "http://blog.testing.app",
      likes: 420,
      user: "668e085f0bd8aadb03daf305",
      id: "668e2aeef6de5cbf1cad7949",
    };

    render(<Blog blog={blog} />);

    const url = screen.queryByText(`${blog.url}`);
    expect(url).toBeNull();

    const likes = screen.queryByText(`${blog.likes}`);
    expect(likes).toBeNull();
  });

  test("Url and Likes is available when view button is clicked", async () => {
    const user = userEvent.setup();

    const blog = {
      title: "Testing blog component",
      author: "abrahaminaja",
      url: "http://blog.testing.app",
      likes: 420,
      user: "668e085f0bd8aadb03daf305",
      id: "668e2aeef6de5cbf1cad7949",
    };

    render(<Blog blog={blog} />);

    const viewButton = screen.getByText("View Detail");

    await user.click(viewButton);

    const likes = screen.queryByText(`${blog.likes}`);
    expect(likes).toBeDefined();

    const url = screen.queryByText(`${blog.url}`);
    expect(url).toBeDefined();
  });
});
