---
title: Screenshot testing
created: "2025-12-01"
updated: "2025-12-01"
description: to be updated
labels:
  - testing
keywords:
  - screenshot testing
image: /how-i-earned-uk-global-talent-visa/image_v2.png
---

## 1. Requirements

We'd like to write screenshot tests which satisfy the following requirements:

1. Are separated from unit tests
2. Test multiple UI components
3. Take screenshots of multiple states of UI components
4. Visualise the diff between screenshots
5. Create report of all taken screenshots
6. Customise a difference threshold

## 2. Matchers

### jest-image-snapshot

`jest-image-snapshot` matches screenshots using `toMatchImageSnapshot` and calculates the diff using [pixelmatch](https://github.com/mapbox/pixelmatch)

it can be used with any browser controlling library (e.g. puppeteer):

```typescript title="Example with jest-image-snapshot"
it("renders correctly", async () => {
  const page = await browser.newPage();
  await page.goto("https://localhost:3000");
  await page.waitForNavigation();
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});
```

Link - https://github.com/americanexpress/jest-image-snapshot (developed by American Express)

### playwright

`playwright` is browser controlling library, with built-in support for matching screenshots

```typescript title="Example with playwright"
test("renders correctly", async ({ page }) => {
  await page.setViewportSize(device);
  await page.goto("http://localhost:3000");
  await expect(page).toHaveScreenshot(`${device.description}.png`);
});
```

Link - https://github.com/microsoft/playwright (developed by Microsoft)

### A custom solution

TODO

- [ ] Take existing browser controlling library (e.g. puppeteer)
- [ ] Use storybook (or other solutions) for building static pages with UI components with different states
- [ ] Write a custom matcher
- [ ] Write a custom reporter

## 3. Browser controlling libraries

TODO

- [ ] How to choose
- [ ] How to integrate into CI: pros/cons

## 4. Implementation

### Approach 4.1.

TODO

- [ ] Repo
- [ ] Docker
- [ ] Run on CI
