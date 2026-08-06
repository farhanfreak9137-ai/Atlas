# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\atlas.spec.ts >> Check /
- Location: tests\atlas.spec.ts:18:7

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Atlas/i
Received string:  "Login – Vercel"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    13 × unexpected value "Login – Vercel"

```

```yaml
- link "Skip to content":
  - /url: "#geist-skip-nav"
- banner:
  - link "Vercel logo":
    - /url: /home
    - button "Vercel Logo":
      - img "Vercel Logo"
  - navigation:
    - navigation:
      - link "Sign Up":
        - /url: /signup?next=%2Fsso-api%3Furl%3Dhttps%253A%252F%252Fatlas-aa7q-9pupl0cbh-farhanfreak9137-ais-projects.vercel.app%252F%26nonce%3D9c75873d41dfccae7b33ab803fe2b65962512962bed2a1f123a22eeac557cd48
        - paragraph: Sign Up
- main:
  - heading "Log in to Vercel" [level=1]
  - textbox "Email Address"
  - button "Continue with Email"
  - button "Continue with Google"
  - button "Continue with GitHub"
  - button "Continue with Apple"
  - button "Continue with SAML SSO":
    - img
    - text: Continue with SAML SSO
  - button "Continue with Passkey":
    - img
    - text: Continue with Passkey
  - button "Show other options"
  - paragraph:
    - text: Don't have an account?
    - link "Sign Up":
      - /url: /signup?next=%2Fsso-api%3Furl%3Dhttps%253A%252F%252Fatlas-aa7q-9pupl0cbh-farhanfreak9137-ais-projects.vercel.app%252F%26nonce%3D9c75873d41dfccae7b33ab803fe2b65962512962bed2a1f123a22eeac557cd48
  - link "Terms":
    - /url: /legal/terms
  - link "Privacy Policy":
    - /url: /legal/privacy-policy
- alert
- img
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const BASE_URL =
  4  |   "https://atlas-aa7q-9pupl0cbh-farhanfreak9137-ais-projects.vercel.app";
  5  | 
  6  | const routes = [
  7  |   "/",
  8  |   "/tasks",
  9  |   "/habits",
  10 |   "/goals",
  11 |   "/calendar",
  12 |   "/notes",
  13 |   "/reminders",
  14 |   "/ai",
  15 | ];
  16 | 
  17 | for (const route of routes) {
  18 |   test(`Check ${route}`, async ({ page }) => {
  19 |     const errors: string[] = [];
  20 | 
  21 |     page.on("console", (msg) => {
  22 |       if (msg.type() === "error") {
  23 |         errors.push(msg.text());
  24 |       }
  25 |     });
  26 | 
  27 |     await page.goto(BASE_URL + route);
  28 | 
> 29 |     await expect(page).toHaveTitle(/Atlas/i);
     |                        ^ Error: expect(page).toHaveTitle(expected) failed
  30 | 
  31 |     await page.screenshot({
  32 |       path: `screenshots/${route === "/" ? "home" : route.slice(1)}.png`,
  33 |       fullPage: true,
  34 |     });
  35 | 
  36 |     expect(errors).toEqual([]);
  37 |   });
  38 | }
```