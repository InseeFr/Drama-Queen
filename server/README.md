# Mock server

This package is used during development to provide a fake server for the Queen API

```bash
bun run dev
```

Then, in the Drama queen .env set

```env
VITE_QUEEN_API_URL=http://localhost:3000
```

Then you can request a synchronization (http://localhost:5001/queen/synchronize) to get fake data from this API

# How sync works ?

When calling `/queen/synchronize` the runs synchronization workflow runs

- It Uploads local data first
- If upload succeeds, fetch the data remotely and refresh the local data
- When finished (or on error), redirects to `/queen`

This behavior is implemented by the `synchronizeData` use case (`thunks.ts` and `evt.ts`) and the page `SynchronizeData.tsx`.

## The SynchronizeData component

- On mount: calls `synchronizeData.upload()`.
- Subscribes to events; on `uploadError`, `downloadCompleted`, or `downloadFailed`, it posts a `redirect` action and sets `window.location = window.location.origin`.
- Displays progress bars during upload and download.

### Upload step (local ➜ server)

Code: `thunks.upload()` in `src/core/usecases/synchronizeData/thunks.ts`.

- Initializes local sync status in `localSyncStorage` (clears error, success/temp lists).
- Interrogations:
  - Reads all locally stored interrogations: `dataStore.getAllInterrogations()`.
  - For each interrogation:
    - Tries `queenApi.putInterrogation(interrogation)`.
    - If the server replies `423` (locked), it is treated as success.
    - If the server replies with one of `[400, 403, 404, 500]`, it falls back to `queenApi.postInterrogationInTemp(interrogation)`, then:
      - Records the ID in `localSyncStorage.addIdToInterrogationsInTempZone(id)`.
      - Deletes local paradata for that interrogation: `dataStore.deleteParadata(id)` and marks that paradata ID as deleted to avoid uploading it later in the same run.
    - On success, deletes the local interrogation: `dataStore.deleteInterrogation(id)` and updates progress.
- Paradata (only if telemetry is enabled via `IS_TELEMETRY_ENABLED`):
  - Reads all paradata: `dataStore.getAllParadata()`.
  - Filters out paradata whose interrogation was just moved to temp (so we don’t upload it): `!deletedParadataIds.has(paradata.idInterrogation)`.
  - For each remaining paradata:
    - `queenApi.postParadata(paradata)` then `dataStore.deleteParadata(paradata.idInterrogation)` and update progress.
- On success: dispatches `uploadCompleted` and immediately triggers the download step with `dispatch(thunks.download())`.
- On error: flags `localSyncStorage.addError(true)` and dispatches `uploadError` (the page will redirect).

APIs used during upload:

- `queenApi.putInterrogation(interrogation)`
- `queenApi.postInterrogationInTemp(interrogation)`
- `queenApi.postParadata(paradata)`

### Download step (server ➜ local/cache)

Code: `thunks.download()` in `src/core/usecases/synchronizeData/thunks.ts`.

- Campaigns & questionnaires:
  - `queenApi.getCampaigns()` → list of campaigns; collect all distinct `questionnaireIds` across them.
  - For each `questionnaireId`: `queenApi.getQuestionnaire(id)`.
    - On each successful questionnaire fetch, updates progress and stores in memory for later steps.
- Interrogations:
  - For each campaign ID:
    - `queenApi.getInterrogationsIdsAndQuestionnaireIdsByCampaign(campaignId)` returns pairs `{ id, questionnaireId }`.
    - For each `id`: `queenApi.getInterrogation(id)` then `dataStore.updateInterrogation(interrogation)` to refresh the local store.
    - If the interrogation’s `questionnaireId` is among the successfully fetched questionnaires, record its ID in `localSyncStorage.addIdToInterrogationsSuccess(id)` (used by the UI/redirect info).
    - Certain HTTP errors `[400, 403, 404, 500]` are logged and ignored so the sync can continue; other errors are rethrown to fail the sync.
- Nomenclatures:
  - From all fetched questionnaires, gather distinct suggester names (nomenclature IDs).
  - For each nomenclature ID: call `queenApi.getNomenclature(id)`.
    - The app does not store the data itself; it triggers fetches so the Service Worker can cache responses.
- External resources (optional):
  - Only if `EXTERNAL_RESOURCES_URL` is configured.
  - `getExternalQuestionnaires()` retrieves the list of external questionnaires (via the external resources API, separate from Queen).
  - `getExternalQuestionnaireFiltered()` splits them into `neededQuestionnaires` (those referenced by successfully fetched questionnaires) and `notNeededQuestionnaires`.
  - For each needed questionnaire: `getResourcesFromExternalQuestionnaire({ questionnaire, callBackTotal, callBackReset, callBackUnit })` which fetches and puts files into the browser Cache Storage, updating progress callbacks along the way.
  - Deletes caches for `notNeededQuestionnaires` and any “old” external caches not in the list (`getOldExternalCacheNames` + `caches.delete`). If none are needed, it also deletes the root cache `cache-root-external`.
- Completion:
  - After all of the above finish, dispatches `downloadCompleted`.
  - On any unexpected error: sets `localSyncStorage.addError(true)` and dispatches `downloadFailed`.

APIs used during download:

- `queenApi.getCampaigns()`
- `queenApi.getQuestionnaire(questionnaireId)`
- `queenApi.getInterrogationsIdsAndQuestionnaireIdsByCampaign(campaignId)`
- `queenApi.getInterrogation(id)`
- `queenApi.getNomenclature(id)`
- External resources helpers: `getExternalQuestionnaires`, `getExternalQuestionnaireFiltered`, `getResourcesFromExternalQuestionnaire`, `getOldExternalCacheNames` (use fetch/cache under the hood)

### What data is fetched from the API?

- From Queen API:
  - List of campaigns
  - Questionnaires by ID
  - Interrogation IDs (per campaign) and each interrogation’s full data
  - Nomenclatures referenced by questionnaires
- From the external resources API (if configured):
  - List of external questionnaires
  - Each questionnaire’s resource files to cache

### What is done with the fetched data?

- Interrogations: stored/updated locally via `dataStore.updateInterrogation` (download) and deleted locally once successfully uploaded (upload). Temp-zone handling is used as a fallback for certain server errors.
- Questionnaires: fetched to ensure local consistency and to derive nomenclature and external-resource needs; not stored directly here besides in-memory usage and SW caching.
- Nomenclatures: fetched to let the Service Worker cache them; progress updated.
- External resources: fetched and placed into Cache Storage; unneeded caches are cleaned up.
- Progress state is kept in Redux-like state (`synchronizeData/state.ts`) to drive the UI’s progress bars.
- `localSyncStorage` tracks success/error and lists of interrogation IDs handled during the run.
