import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("successfully adding a new blog", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const title = screen.getByPlaceholderText("a new title...");
    const author = screen.getByPlaceholderText("abraham");
    const url = screen.getByPlaceholderText("http://abrahamnaibrohu");
    const likes = screen.getByPlaceholderText("a number");

    const sendButton = screen.getByText("SAVE BLOG");

    await user.type(title, "testing blog...");
    await user.type(author, "abrahaminaja");
    await user.type(url, "http://abrahaminaja");
    await user.type(likes, "420");

    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("testing blog...");
    expect(createBlog.mock.calls[0][0].author).toBe("abrahaminaja");
    expect(createBlog.mock.calls[0][0].url).toBe("http://abrahaminaja");
    expect(createBlog.mock.calls[0][0].likes).toBe("420");
  });
});
