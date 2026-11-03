# Training Flights

**TRAINING ONLY — simulated booking, no ticket issued.**

A small React/Vite app using plain JavaScript and ordinary CSS. Search three fictional flights, select one, and confirm a simulated booking using **Test Traveller**. Departures are local IST times; fares are fictional INR amounts per person.

## Prerequisites and commands

Install Node.js and npm supported by the Vite version in `package.json`. This app was set up with Node `26.13.0` and npm `11.20.0`. No Python, service account, API key, or backend is needed.

From this app directory in PowerShell:

```powershell
# First setup (already completed in this workspace)
npm.cmd install

# Subsequent clean checkout: install exact locked versions instead
npm.cmd ci

# Start development server
npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Open http://127.0.0.1:5173. Keep that terminal open during browser checks. Stop with **Ctrl+C** before starting another server. `--strictPort` reports a busy port rather than silently changing it.

```powershell
# Produce dist/
npm.cmd run build

# Serve the built app locally
npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Open http://127.0.0.1:4173. Preview is local serving, not public hosting. Only one server is needed at a time.

## Manual acceptance checks

The initial search is BLR → DEL on **2026-11-20**. Click **Search flights** to display results.

| Check | Action | Expected result |
| --- | --- | --- |
| T01 | Search BLR → DEL, 2026-11-20 | Exactly TR102 (INR 6,500) then TR101 (INR 5,000), highest price first, with the fixture departures |
| T02 | Search BOM → DEL, or change the date to 2026-11-21 | Clear no-flights message |
| T03 | Choose the same airports, then separately clear the date | Helpful validation; no invalid results |
| T04 | Select TR101, use Test Traveller and 2 passengers, confirm | Total INR 10,000 before and after confirmation; status SIMULATED; reference starts TRAIN- |
| T05 | Submit a blank/whitespace name; separately try counts 0, 7, 1.5, and empty | Validation; no confirmation |
| T06 | Refresh after confirmation | Confirmation and selection disappear; default search inputs return |
| T07 | Build and open local preview | Search and simulated booking still work |

Also confirm that changing search inputs or choosing another flight immediately clears a confirmation. Editing test details clears it too. Try BLR → BOM on the sample date for TR103 and verify 3 × INR 4,000 = INR 12,000. Use Tab and Enter to check the controls with a keyboard; check a narrow browser window for readable layout.

## Small code map

- `src/data/flights.js`: the three exact fixtures from the brief.
- `src/App.jsx`: search, validation, selection, total and confirmation using React state.
- `src/App.css` and `src/index.css`: responsive layout, readable controls and focus indicators.
- `Flight_Booking_AI_Build_Brief.md`: supplied specification.

For example, `setSearch({ ...search, [event.target.name]: event.target.value })` copies the previous search object, replaces the edited field, and asks React to render the new state. The same handler clears results, selection and confirmation so old details cannot remain attached to a new search.

## Simulation limits and AI use

Everything runs in this browser. Nothing is booked or charged. There is no authentication, real inventory, external flight/AI API, payment, database, or persistent storage. A `TRAIN-` reference is only a local display identifier. Refreshing resets the app's in-memory state. Use fictional information only.

Created with **OpenAI Codex**, using the supplied brief. Human review should include the manual checks above, a successful local build/preview, review of the fixture values and total calculation, and confirmation that the training warning stays visible. Tool verification is reported separately; this note does not imply human checks have been completed.
