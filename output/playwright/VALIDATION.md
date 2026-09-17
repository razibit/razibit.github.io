# Local validation — 2026-09-17

Tested the actual static portfolio on loopback port 8765 using headed Google Chrome through Playwright CLI. Chrome DevTools Protocol Debugger and Accessibility domains were enabled during the checks. This is local evidence, not deployed-site validation or a complete WCAG certification.

## Passed

- Full-page captures at 320, 390, 834, 1024, and 1440 CSS pixels, in light and dark mode; locally loaded Inter; three visible projects; no horizontal document overflow.
- All five section links and the primary contact action navigate to the same-page destination with its heading visible.
- Keyboard skip link has a visible focus outline and transfers focus to main content.
- Explicit theme choice survives reload; system preferences and subsequent changes apply without a saved override.
- A context whose localStorage getter throws still loads and changes theme.
- Tall desktop introduction is sticky; short desktop returns to normal flow.
- 200% text enlargement at 320px reflows without horizontal scrolling. Fixed narrow Skills labels were corrected following visual inspection.
- Social controls disabled, screen-reader named, without visible labels or tooltips; email is exact placeholder text without a mailto destination; no Upwork in page content.
- No browser console errors or failed requests during the run.

## Measured contrast

| Pair | Light | Dark |
| --- | ---: | ---: |
| Primary text/background | 14.94:1 | 14.83:1 |
| Secondary text/background | 6.02:1 | 8.16:1 |
| Placeholder text/surface | 5.30:1 | 6.62:1 |
| Links and focus/background | 6.87:1 | 9.22:1 |
| Button text/fill | 7.18:1 | 9.22:1 |
| Control color/background | 3.73:1 | 4.36:1 |

Ratios use the WCAG sRGB relative luminance formula and authored theme variables. Subtle section separators are decorative; essential control edges and focus use the stronger control/accent colors.

## Evidence and reproduction

`validate.js` is a Playwright CLI callback, not a site dependency. With the local server running:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio open http://127.0.0.1:8765 --browser chrome --headed
npx --yes --package @playwright/cli playwright-cli -s=portfolio run-code --filename output/playwright/validate.js --raw
```

`validation.txt` contains the structured check results. `<width>-<theme>.png` files show the complete rendered page. `text-zoom.png` shows text enlargement, which is distinct from native browser page zoom. Native browser zoom and assistive-technology user testing are not certified by these checks. All personal content placeholders still need replacement before publishing.
