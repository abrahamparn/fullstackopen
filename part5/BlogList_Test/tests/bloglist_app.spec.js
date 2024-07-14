const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith } = require("./bloglist_app.helper");
describe("Blog app tests", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "LOGIN" })).toBeVisible();
  });

  describe("Login Tests", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:5173/api/testing/reset");
      await request.post("http://localhost:5173/api/users", {
        data: {
          name: "tester agent",
          username: "tester",
          password: "tester",
        },
      });
    });

    test("succeeds with correct credentials", async ({ page }) => {
      loginWith(page, "tester", "tester");
      await expect(page.getByText("tester")).toBeVisible();
      await expect(page.getByRole("button", { name: "LOGOUT" })).toBeVisible();
      await expect(page.getByText("blogs")).toBeVisible();
    });
    test("fails when wrong passwords", async ({ page }) => {
      loginWith(page, "tester", "ululala");
      let notification = page.getByTestId("notification");
      await expect(notification).toContainText("Invalid username or password");
      await expect(notification).toHaveCSS("color", "rgb(255, 0, 0)");
    });
    test("fails when wrong username", async ({ page }) => {
      loginWith(page, "ululala", "tester");
      let notification = page.getByTestId("notification");
      await expect(notification).toContainText("Invalid username or password");
      await expect(notification).toHaveCSS("color", "rgb(255, 0, 0)");
    });
    test("fails when no username or passwords is given", async ({ page }) => {
      await page.getByRole("button", { name: "LOGIN" }).click();
      await expect(page.getByTestId("username")).toBeVisible();
      await expect(page.getByTestId("password")).toBeVisible();
      let notification = page.getByTestId("notification");
      await expect(notification).toContainText("Invalid username or password");
      await expect(notification).toHaveCSS("color", "rgb(255, 0, 0)");
    });
  });
});
