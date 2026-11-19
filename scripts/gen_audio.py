"""Generate MP3s for scripts/audio-manifest.json with Microsoft neural Latvian voices (edge-tts).
Only missing files are generated, so re-running is cheap."""
import asyncio, json, os, sys
import edge_tts

VOICES = {"f": "lv-LV-EveritaNeural", "m": "lv-LV-NilsNeural"}
OUT = os.path.join("public", "audio")
RATE = "-12%"  # A2 exam speech is slow and clear

async def one(sem, item, stats):
    path = os.path.join(OUT, item["file"])
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(item["t"], VOICES[item["v"]], rate=RATE).save(path)
                stats["made"] += 1
                return
            except Exception as e:  # network hiccup: retry
                if attempt == 3:
                    stats["failed"].append((item["t"][:40], str(e)[:80]))
                await asyncio.sleep(1 + attempt * 2)

async def main():
    os.makedirs(OUT, exist_ok=True)
    items = json.load(open(os.path.join("scripts", "audio-manifest.json"), encoding="utf-8"))
    stats = {"made": 0, "failed": []}
    sem = asyncio.Semaphore(8)
    await asyncio.gather(*(one(sem, i, stats) for i in items))
    print(f"generated {stats['made']}, total {len(items)}, failed {len(stats['failed'])}")
    for f in stats["failed"]:
        print("  FAILED:", f)
    sys.exit(1 if stats["failed"] else 0)

asyncio.run(main())
