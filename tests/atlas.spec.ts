import { test, expect } from "@playwright/test";

const BASE_URL =
  "https://atlas-aa7q-9pupl0cbh-farhanfreak9137-ais-projects.vercel.app";

const routes = [
  "/",
  "/tasks",
  "/habits",
  "/goals",
  "/calendar",
  "/notes",
  "/reminders",
  "/ai",
  "/gym",
  "/football",
];

for (const route of routes) {
  test(`Check ${route}`, async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto(BASE_URL + route);

    await expect(page).toHaveTitle(/Atlas/i);

    await page.screenshot({
      path: `screenshots/${route === "/" ? "home" : route.slice(1)}.png`,
      fullPage: true,
    });

    expect(errors).toEqual([]);
  });
}