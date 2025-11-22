# Sold — Next.js Port

This project is a direct Next.js port of your existing static Sold site.

- Uses Next.js 14 (App Router) + TypeScript + Tailwind
- `app/page.tsx` is the home hero
- Each original HTML file from `Sold web/sold-site/*.html` now lives under `app/<slug>/page.tsx`
  and is rendered via `dangerouslySetInnerHTML`, preserving your exact markup for now.

## Scripts

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Routes

- `/` → Home
- `/refinance` → refinance.html
- `/refinance2` → refinance2.html
- `/refinance2-success` → refinance2-success.html
- `/first-home-buyer` → first-home-buyer.html
- `/first-home-buyer2` → first-home-buyer2.html
- `/first-home-buyer2-success` → first-home-buyer2-success.html
- `/investment` → investment.html
- `/investment2` → investment2.html
- `/investment2-success` → investment2-success.html
- `/purchase` → purchase.html
- `/purchase2` → purchase2.html
- `/purchase2-success` → purchase2-success.html
- `/frollo` → frollo.html
- `/success` → success.html
- `/fhbguide` → fhbguide.html
- `/terms` → terms.html
- `/privacy` → privacy.html

Later, you can gradually refactor each page from `dangerouslySetInnerHTML` into proper React components,
but this gives you a working Next.js site immediately.
