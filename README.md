# QR Tracker

UPI QR monthly receiving-limit tracker for branches. Installable PWA (Android + iPhone), shared Firebase data.

- `index.html` – the whole app (React + Firebase via CDN, no build step)
- `firestore.rules` – security rules, paste into Firebase console
- `manifest.webmanifest`, `sw.js`, `icons/` – PWA install support
- `firebase.json` – only for running the local Firebase emulator

Setup steps: see [SETUP.md](SETUP.md).

Local test with the emulator: `firebase emulators:start --project demo-qrtracker`, put a dummy config
(`projectId: "demo-qrtracker"`) in `index.html`, serve the folder on localhost and open `/?emulator`.
