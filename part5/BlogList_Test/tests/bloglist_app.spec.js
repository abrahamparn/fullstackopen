const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./bloglist_app.helper");
describe("Blog app tests", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:5173/api/testing/reset");
    await request.post("http://localhost:5173/api/users", {
      data: {
        name: "tester agent",
        username: "tester",
        password: "tester",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "LOGIN" })).toBeVisible();
  });

  describe("Login Tests", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "tester", "tester");

      await expect(page.getByText("tester")).toBeVisible();
      await expect(page.getByRole("button", { name: "LOGOUT" })).toBeVisible();
      await expect(page.getByText("blogs")).toBeVisible();
    });
    test("fails when wrong passwords", async ({ page }) => {
      await loginWith(page, "tester", "ululala");
      let notification = await page.getByTestId("notification");
      await expect(notification).toContainText("Invalid username or password");
      await expect(notification).toHaveCSS("color", "rgb(255, 0, 0)");
    });
    test("fails when wrong username", async ({ page }) => {
      await loginWith(page, "ululala", "tester");
      let notification = await page.getByTestId("notification");
      await expect(notification).toContainText("Invalid username or password");
      await expect(notification).toHaveCSS("color", "rgb(255, 0, 0)");
    });
    test("fails when no username or passwords is given", async ({ page }) => {
      await page.getByRole("button", { name: "LOGIN" }).click();
      await expect(page.getByTestId("username")).toBeVisible();
      await expect(page.getByTestId("password")).toBeVisible();
      let notification = await page.getByTestId("notification");
      await expect(notification).toContainText("Invalid username or password");
      await expect(notification).toHaveCSS("color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in, and can create blog", () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, "tester", "tester");
      await page.getByText("tester").waitFor();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Add New Blog" }).click();
      await createBlog(
        page,
        "test sample",
        "tester account",
        "http://tester.agent.com",
        "69"
      );
      await page.getByRole("button", { name: "SAVE BLOG" }).click();

      await expect(page.getByTestId("notification")).toContainText(
        "Successfully adding new blog"
      );
      await expect(page.getByText("test sample tester account")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "View Detail" })
      ).toBeVisible();
    });
  });

  describe("When logged in, created blog", () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, "tester", "tester");
      await page.getByText("tester").waitFor();

      await createBlog(
        page,
        "test sample",
        "tester account",
        "http://tester.agent.com",
        "69"
      );
    });
    test("the newly created blog, could beliked", async ({ page }) => {
      await page
        .getByText("test sample tester account")
        .getByRole("button", { name: "View Detail" })
        .click();

      await page.getByRole("button", { name: "Like" }).click();
      let oldNumber = 69;
      let newNumber = await page.getByTestId("likes").textContent();
      await page.getByText("70").waitFor();
      await expect(oldNumber).not.toBe(newNumber);
    });

    test("the newly added blog, can be deleted", async ({ page }) => {
      await page.goto("http://localhost:5173");
      await page
        .getByText("test sample tester account")
        .getByRole("button", { name: "View Detail" })
        .click();
      page.on("dialog", (dialog) => dialog.accept());

      await page.getByRole("button", { name: "Delete Blog" }).click();

      // There should be a window.confirm, how to click okay?
      await page.goto("http://localhost:5173");

      await expect(
        page.getByText("test sample tester account")
      ).not.toBeVisible();
    });

    test("only the user can delete the note", async ({ page, request }) => {
      await page.getByRole("button", { name: "LOGOUT" }).click();
      await page.goto("http://localhost:5173");
      await request.post("http://localhost:5173/api/users", {
        data: {
          name: "second tester agent",
          username: "second",
          password: "second",
        },
      });
      await loginWith(page, "second", "second");
      await page.getByText("second").waitFor();

      await page.goto("http://localhost:5173");
      await page
        .getByText("test sample tester account")
        .getByRole("button", { name: "View Detail" })
        .click();
      await expect(
        page.getByRole("button", { name: "Delete Blog" })
      ).not.toBeVisible();
    });

    test("blog is arranged in the order of likes", async ({ page }) => {
      // Create the second blog
      await createBlog(
        page,
        "second sample",
        "tester account",
        "http://tester.agent.com",
        "70"
      );

      // Create the third blog
      await createBlog(
        page,
        "third sample",
        "tester account",
        "http://tester.agent.com",
        "71"
      );

      // Navigate to the blog page
      await page.goto("http://localhost:5173");

      // Assert that the blogs are arranged in the order of likes
      const blogItems = page.locator(".blogItem"); // Assuming the class name for blog items is 'blogItem'

      // Check the first blog item
      await expect(
        blogItems.nth(0).getByText("third sample tester account")
      ).toBeVisible();

      // Check the second blog item
      await expect(
        blogItems.nth(1).getByText("second sample tester account")
      ).toBeVisible();

      // Add additional checks if needed for more blogs
      // Check the second blog item
      await expect(
        blogItems.nth(2).getByText("test sample tester account")
      ).toBeVisible();
    });
  });
});
