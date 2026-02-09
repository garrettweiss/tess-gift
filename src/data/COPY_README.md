# Site copy — single source of truth

Edit the copy in one place and the whole site updates when you save.

## Where to edit

| What you want to change | File to edit |
|-------------------------|--------------|
| **All UI copy** (buttons, headings, screen text, labels) | **`src/data/copy.ts`** |
| **Location content** (stop names, stories, reflection prompts, directions, “between stops” prompts, transport text) | **`src/data/stops.ts`** |

## How it works

- **`copy.ts`** — One object, `COPY`, with every UI string (welcome, opening, arrival, camera, confirm photo, reveal, reflection, between stops, navigation, en route, final, poster, progression tracker, restart button, visited places, and poster PDF text). Edit any value and save; the app and PDF generator read from here.
- **`stops.ts`** — Each stop’s `hiddenName`, `storyText`, `reflectionPrompt`, optional `photoInstruction` and `directions`, and `transportRecommendations` (label/description). The `BETWEEN_STOPS_PROMPTS` array is also here.

The page title (browser tab) is set from `COPY.pageTitle` when the app loads. The initial HTML title in `index.html` is only a fallback before React runs.

## Tips

- Use straight quotes and apostrophes in `copy.ts` so edits are consistent.
- For multi-line copy, use `\n` in the string; screens that need line breaks use `whiteSpace: 'pre-line'` or split on `\n`.
- If you add a new screen or button, add the string to `COPY` in `copy.ts` and use it in the component so it stays editable in one place.
