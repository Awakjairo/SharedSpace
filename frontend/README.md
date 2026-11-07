# SharedSpace frontend reconstruction

This is a reconstructed React/Vite frontend based on the screenshots, code excerpts,
API routes, and project descriptions in the supplied 43-page report.

## Run it

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. In the terminal run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (normally http://localhost:5173).

## Backend connection

The frontend expects the Flask API at `http://127.0.0.1:5000` by default.
You can change this by creating a `.env` file from `.env.example` and setting
`VITE_API_BASE_URL`.

The report documents these backend endpoints:
- `POST /register`
- `POST /login`
- `GET /posts`, `POST /posts`
- `GET /services`, `POST /services`
- `GET /weather?city=Nairobi`

The backend's `/profile` and `/settings` update operations were not documented,
so the reconstructed Profile page displays the user information available in
the report/saved login record; it does not pretend to persist edits.

## Important reconstruction notes

- The original screenshots show a navy sidebar, pale grey page background,
  white rounded content surfaces, blue buttons and green service-category labels.
- The report contains an App.jsx excerpt and App.css excerpt, but not complete
  source for every page/component. Files not fully documented were recreated
  to match the screenshots and the report's API contract.
- The report's original frontend imports used root-level component files. This
  reconstruction groups files into `components`, `pages`, and `services` for
  maintainability while preserving the documented routes and visible features.
