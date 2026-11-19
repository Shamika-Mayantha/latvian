# Latvian A2

A course that takes a complete beginner to a pass in the Latvian state language test, A2 level
(*valsts valodas prasmes pārbaude, pamata līmeņa 2. pakāpe*).

- **18 units** built around the topics in the official VIAA programme: words, grammar, a dialogue and exam-style practice in each one
- **771 audio clips** read by native Latvian neural voices (Everita and Nils), slowed to A2 pace
- **3 full mock exams** in the real format: listening, reading, writing and speaking, 15 points each, with a 9-point pass line per part
- Spaced-repetition word review, a one-page grammar sheet, and a speaking question bank
- Accounts and progress stored in Supabase, with row-level security on every table

## Run locally

```bash
npm install
npm run dev
```

## Deploy (Vercel)

Import this repo in Vercel. The framework is detected as Vite, so there's nothing else to configure.
`vercel.json` handles SPA routing and caching for the audio files.

In Supabase → Authentication → URL Configuration, set **Site URL** to the Vercel URL and add
`https://<your-app>.vercel.app/**` to **Redirect URLs**, so confirmation and password-reset emails link back to the site.

## Editing content

- Units: `src/data/units/stage1.ts`, `stage2.ts`, `stage3.ts`
- Mock exams: `src/data/exams/mock*.ts`

After changing any Latvian text, regenerate the audio. Only new or changed lines get generated:

```bash
pip install edge-tts
npm run audio:manifest
npm run audio:gen
```

## Database

Supabase tables, all with RLS restricted to the owner: `lv_profiles`, `lv_lesson_progress`, `lv_exam_attempts`, `lv_vocab_review`.

## Sources

The exam format, points, timing and mock exam 1 are based on the official VIAA 2026 A2 sample paper:
https://www.viaa.gov.lv/lv/parbaudes-programma
