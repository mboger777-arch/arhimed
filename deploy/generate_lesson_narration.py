"""Generate narration: edge-tts==7.3.1, miniaudio==1.71, LAME CLI.
Each phrase has its own tempo, pitch and pause. No runtime TTS dependency.
"""
import array
import asyncio
import hashlib
import json
import pathlib
import subprocess
import tempfile
import wave
import edge_tts
import miniaudio

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'MVP/lessons'
SAMPLE_RATE = 24000


def signature(voice, segments):
    encoded = json.dumps([voice, segments], ensure_ascii=False, separators=(',', ':'))
    return hashlib.sha256(encoded.encode()).hexdigest()[:12]


def trim_silence(samples):
    # Retain 80 ms around speech, including quiet consonants and natural release.
    audible = [i for i, value in enumerate(samples) if abs(value) > 40]
    if not audible:
        raise ValueError('Silent narration phrase')
    margin = int(SAMPLE_RATE * .08)
    return samples[max(0, audible[0] - margin):min(len(samples), audible[-1] + margin + 1)]


async def main():
    semaphore = asyncio.Semaphore(4)
    jobs = {}
    for lesson in ['257', '300']:
        spec = json.loads((ROOT / lesson / 'narration.json').read_text())
        manifest = {}
        for key, clip in spec['clips'].items():
            relative = f"assets/voice/{signature(spec['voice'], clip['segments'])}.mp3"
            if clip['file'] != relative:
                raise ValueError(f'Stale file hash: {lesson}/{key}')
            manifest[key] = relative
            file = ROOT / lesson / relative
            file.parent.mkdir(parents=True, exist_ok=True)
            jobs[str(file)] = (file, clip, spec['voice'])
        (ROOT / lesson / 'narration-manifest.js').write_text(
            '// Generated from narration.json. Regenerate with deploy/generate_lesson_narration.py.\n'
            + 'window.LESSON_NARRATION = ' + json.dumps(manifest, ensure_ascii=False, indent=2) + ';\n')

    async def generate(file, clip, voice):
        if file.exists() and file.stat().st_size > 1000:
            return
        async with semaphore:
            with tempfile.TemporaryDirectory() as directory:
                temporary = pathlib.Path(directory)
                joined = array.array('h')
                for index, phrase in enumerate(clip['segments']):
                    part = temporary / f'{index}.mp3'
                    for retry in range(4):
                        try:
                            await edge_tts.Communicate(
                                phrase['text'], voice=voice, rate=phrase['rate'],
                                pitch=phrase['pitch']).save(str(part))
                            decoded = miniaudio.decode_file(str(part), nchannels=1, sample_rate=SAMPLE_RATE)
                            joined.extend(trim_silence(decoded.samples))
                            joined.extend([0] * int(SAMPLE_RATE * phrase['pauseMs'] / 1000))
                            break
                        except Exception:
                            if retry == 3:
                                raise
                            await asyncio.sleep(2 * (retry + 1))
                wav = temporary / 'joined.wav'
                with wave.open(str(wav), 'wb') as output:
                    output.setnchannels(1)
                    output.setsampwidth(2)
                    output.setframerate(SAMPLE_RATE)
                    output.writeframes(joined.tobytes())
                partial = file.with_suffix('.part.mp3')
                subprocess.run(['lame', '--quiet', '-b', '64', str(wav), str(partial)], check=True)
                partial.replace(file)
                print('Saved', file.relative_to(ROOT), flush=True)

    await asyncio.gather(*(generate(*job) for job in jobs.values()))
    print('COMPLETE', len(jobs), 'files', flush=True)


if __name__ == '__main__':
    asyncio.run(main())
