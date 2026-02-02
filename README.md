# Alerts Inbox

A small security alerts dashboard I built as a take-home assignment. You can browse alerts, filter and sort them, view details, acknowledge alerts, and create suppression rules for false positives.

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Tests

```bash
npm run test
```

## Stack

- React + TypeScript
- Vite
- React Router v6
- Ant Design (table, form components)
- Vitest for testing

## Pages

- `/` — home, just a link to the inbox
- `/alerts` — the main alerts list with filters and sorting
- `/alerts/:id` — alert details page with evidence, acknowledge button, and suppression form

## Other files

- `SPEC.md` — my plan and technical decisions
- `QA.md` — what I tested and known issues
