# Training Flights app build brief for AI

## Task

Scaffold and implement a small flight-booking demonstration called **Training Flights**. This file is the application specification for the coding assistant. Use it to create the app, not to create a training guide or workbook. The user manages account setup and the training/GitHub exercises separately.

Work in the user-selected location. First inspect the folder and explain the smallest plan and commands. After the user approves the plan, scaffold and implement in small steps. If the app already exists, inspect and extend it without overwriting unrelated work or scaffolding a second nested app.

## Technical scope

- React with Vite, plain JavaScript and ordinary CSS.
- All flight search, validation and simulated booking logic runs in the browser.
- Store dummy flights in `src/data/flights.js`.
- Use React memory for selection and confirmation. Refresh clears them.
- The app must install, build and run with Node/npm alone. Python is not an application dependency.
- Keep dependencies to the normal React/Vite scaffold unless the user approves a justified addition.
- No backend service, external API, AI-model API, payment integration, authentication, seat inventory, database, persistent storage or public deployment.
- Keep **TRAINING ONLY — simulated booking, no ticket issued** visible throughout the interface.
- Use fictional data and the sample name **Test Traveller**. Do not request real passenger information.

## Dummy data

Use these exact records. Dates are ISO strings; departures are local IST times; prices are fictional integer INR amounts per person.

```javascript
export const flights = [
  {
    id: 'TR101', airline: 'Demo Air', origin: 'BLR', destination: 'DEL',
    date: '2026-11-20', departure: '09:00', priceInr: 5000,
  },
  {
    id: 'TR102', airline: 'Demo Air', origin: 'BLR', destination: 'DEL',
    date: '2026-11-20', departure: '14:00', priceInr: 6500,
  },
  {
    id: 'TR103', airline: 'Demo Air', origin: 'BLR', destination: 'BOM',
    date: '2026-11-20', departure: '11:00', priceInr: 4000,
  },
];
```

## User journey

1. **Search:** origin, destination and travel date. Initial values: BLR, DEL and 2026-11-20. Show readable airport labels. Filter the local array by all three values. Normalize airport codes by trimming and uppercasing if using free-text fields.
2. **Results:** show flight ID, airline, route, departure, and price per person. An unmatched route/date displays a clear no-flights message.
3. **Selection:** select one result, show its details, enter a test name and passenger count, and display the total before confirmation.
4. **Confirmation:** show a locally generated reference beginning `TRAIN-`, status `SIMULATED`, route, date, passenger count and total. A reference is only a display identifier; no real reservation exists.

Validate different origin/destination, a selected date, a trimmed nonblank name and an integer passenger count from 1 to 6. An invalid submission must show an understandable message and must not show confirmation. Total equals the selected fixture's `priceInr` multiplied by passenger count. Changing the search or selection must clear any stale confirmation.

Use accessible labels, keyboard-operable controls, readable spacing and clear validation. Keep implementation small enough for a beginner to explain. Avoid router, state-management and UI frameworks for this scope.

## Scaffold and project files

For a new app, use the JavaScript React Vite template in `flight-booking-training`, unless the user selects another directory. Confirm the actual working location before running commands. If the target exists, inspect it first.

Suggested files:

```text
flight-booking-training/
  .gitignore
  README.md
  Flight_Booking_AI_Build_Brief.md
  package.json
  package-lock.json
  index.html
  vite.config.js
  src/
    main.jsx
    App.jsx
    App.css
    data/flights.js
```

Retain other configuration/assets needed by the scaffold. Keep `package-lock.json`. Ignore `node_modules`, `dist`, local logs and secrets. Use approved package sources; do not disable certificate checks or change machine-wide settings.

Windows PowerShell scaffold commands, when the user approves them:

```powershell
npm.cmd create vite@latest flight-booking-training -- --template react
Set-Location flight-booking-training
npm.cmd install
```

Do not execute the scaffold twice if the user has already run it. Do not initialize Git, create branches, commit, push or merge as part of the app build unless the user separately requests that action.

## Implementation sequence

1. Inspect and propose a small plan. Explain commands and expected files.
2. Scaffold once, then add the dummy-data file and search/results UI.
3. Add selection, input validation and simulated confirmation.
4. Show the changed files and focused diff; explain one React state update.
5. Help the user run the acceptance checks below. Report actual observations, not assumed passes.
6. Run the build and explain any failure before applying a small correction. Rerun affected checks after a fix.
7. Write a short app README with prerequisites, install/run/build/preview, sample date, manual checks, memory-reset behavior and simulation limitations. Include an AI-use note naming the tool and human checks.

## Local commands

Run from the app root. The user keeps the chosen server terminal open while checking the browser; only one server is required at a time.

```powershell
npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Development URL: `http://127.0.0.1:5173`. Stop with Ctrl+C before starting another copy.

```powershell
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Built-preview URL: `http://127.0.0.1:4173`. Preview serves the built files locally; it is not public hosting. A fresh clone installs with `npm.cmd ci` before building.

## Acceptance checks

| ID | Action | Required result |
|---|---|---|
| T01 | BLR to DEL, 2026-11-20 | Exactly TR101 and TR102 |
| T02 | BOM to DEL or a different valid date | Clear no-flights state |
| T03 | Same airports or missing date | Helpful validation; no invalid search result |
| T04 | TR101, Test Traveller, two passengers | SIMULATED, TRAIN reference, total INR 10000 |
| T05 | Blank name; count 0, 7 or 1.5 | Validation and no confirmation |
| T06 | Refresh after confirmation | Confirmation clears as documented |
| T07 | Build and local preview | Search and booking still work in built app |

Manual browser checks plus a successful build are sufficient. Do not add an automated test framework unless requested. If browser execution is unavailable, state which checks the user must run; never claim they passed.

## Later feature requests

After the baseline, implement only the feature the user requests. Preserve dummy data, validation and the small architecture. Typical small changes are reset search, ascending price sort, INR formatting, passenger guidance, an actionable empty state, or returning to search after confirmation. Explain the diff and the acceptance check for that specific change.
