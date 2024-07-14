const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    let response = await request.post(
      "http://localhost:3001/api/testing/reset"
    );
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Tester System",
        username: "tester",
        password: "secret",
      },
    });
    await page.goto("/");
  });

  describe("when not logged in", () => {
    test("front page can be opened", async ({ page }) => {
      const locator = await page.getByText("Notes");
      await expect(locator).toBeVisible();
      await expect(
        page.getByText(
          "Note app, Department of Computer Science, University of Helsinki 2024"
        )
      ).toBeVisible();
    });
    test("login form can be opened", async ({ page }) => {
      await loginWith(page, "tester", "secret");
      await expect(page.getByText("tester")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Add New Note" })
      ).toBeVisible();
    });

    test("login fails with wrong password", async ({ page }) => {
      await page.getByRole("button", { name: "LOGIN" }).click();
      await expect(page.getByText("usernaSme")).toBeVisible();

      await page.getByTestId("username").fill("tester");
      await page.getByTestId("password").fill("hehe");
      await page.getByRole("button", { name: "login" }).click();
      const errorDiv = await page.locator(".error");
      await expect(page.getByText("Wrong credentials")).toBeVisible();
      await expect(errorDiv).toContainText("Wrong credentials");
      await expect(page.getByText("tester")).not.toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "tester", "secret");
      await expect(page.getByText("tester")).toBeVisible();
    });

    test("a new note can be created", async ({ page }) => {
      const content = "a note created by playwright";
      await createNote(page, content);

      // Wait for the new note to be visible
      await page.waitForSelector(`text=${content}`);
      await expect(page.getByText(content)).toBeVisible();
    });

    describe("when a note exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "third note");
        await createNote(page, "second note");
      });
      test("importance can be changed", async ({ page }) => {
        const otherNoteElement = await page.getByText("second note");
        const firstButton = await otherNoteElement.getByTestId(
          "important-button"
        );
        const firstButtonLabel = await firstButton.textContent();
        console.log("firstbuttonlabel: ", firstButtonLabel);
        await firstButton.click();
        await page.waitForTimeout(3000);

        const firstbuttonlabelNew = await firstButton.textContent();
        await expect(firstbuttonlabelNew).not.toBe(firstButtonLabel);
      });
    });
  });
});
